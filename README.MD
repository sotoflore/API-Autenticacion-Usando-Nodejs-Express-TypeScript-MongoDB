# API de Autenticacion con Nodejs, Express y TypeScript

- Comando para generar un secreto de json web token
```bash
openssl rand -hex 32
```

- **`process.env.NODE_ENV === "production"`**

    Esta es una verificación del entorno en el que se está ejecutando la aplicación.
    **process.env.NODE_ENV** es una variable de entorno que se utiliza para diferenciar entre los diferentes modos en los que puede correr una aplicación Node.js:

    - **development**: Cuando estás desarrollando y probando la aplicación localmente.
    - **production**: Cuando la aplicación está desplegada y accesible al público.

    Al comparar si **process.env.NODE_ENV** es **"production"**, estamos preguntando si la aplicación está en modo producción.

    **Propósito de la condición**:
    
    En producción **(process.env.NODE_ENV === "production" es true)**, el valor de secure se establece como true, lo que significa que la cookie solo se enviará por conexiones **HTTPS**.
    
    En desarrollo **(process.env.NODE_ENV === "production" es false)**, el valor de secure será false, permitiendo que la cookie también se envíe a través de conexiones **HTTP**, lo cual es útil cuando estás probando localmente, donde no siempre usas **HTTPS**.
