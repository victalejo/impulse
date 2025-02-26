// app/api/printify/products/route.ts
import { NextResponse } from 'next/server';

// Almacenar variables de entorno seguras para producción
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6IjIxMDFiZmUyYzU2NjhlNjgxMTNjMmFhNGY0YjkzMjFkN2E4ZGI0ZTMwZmMzYzVmNTczZWU1N2NkYzU2YTFlMGRiM2IxOWQ5NDllYmE4NmFiIiwiaWF0IjoxNzQwMjY5MDU1Ljk5MDQ1NCwibmJmIjoxNzQwMjY5MDU1Ljk5MDQ1NywiZXhwIjoxNzcxODA1MDU1Ljk3NDc5Miwic3ViIjoiMTA5MTMzMzAiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.AVooeLzDiGre0JFGufX7PPjYif9LGg8DWHQH9Y_7n6kYNLbwaHONCiDYxuXrivTU3DTJU81u7cDNtLDNDP0';
const SHOP_ID = '5981437';

// En un entorno real, obtendrías estos valores de variables de entorno:
// const API_TOKEN = process.env.PRINTIFY_API_TOKEN;
// const SHOP_ID = process.env.PRINTIFY_SHOP_ID;

export async function GET(request: Request) {
    try {
        // Obtener parámetros de consulta (page, limit)
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '8';

        // Realizar la solicitud a la API de Printify
        const response = await fetch(
            `https://api.printify.com/v1/shops/${SHOP_ID}/products.json?page=${page}&limit=${limit}`,
            {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'User-Agent': 'Impulse Rentals Web App'
                },
                // Importante: esto asegura que las credenciales y tokens se envíen desde el servidor
                cache: 'no-store'
            }
        );

        if (!response.ok) {
            // Si la API de Printify devuelve un error, lo propagamos
            const errorData = await response.json();
            return NextResponse.json({ error: errorData }, { status: response.status });
        }

        const data = await response.json();

        // Devolver los datos al cliente
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching products from Printify:', error);
        return NextResponse.json(
            { error: 'Error al obtener productos de Printify' },
            { status: 500 }
        );
    }
}