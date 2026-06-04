# Ruklo Customers API

Este proyecto corresponde a una prueba técnica para Ruklo.  
Consiste en una API desarrollada con NestJS que permite gestionar clientes y cargar datos desde un archivo CSV, asegurando la consistencia de la información.

---

## 🚀 Tecnologías utilizadas

- Node.js
- NestJS
- Prisma ORM
- SQLite
- TypeScript
- csv-parser
- Postman (para pruebas)

---

## 🎯 Objetivo del proyecto

Construir una API que permita:

- Crear clientes individualmente
- Consultar clientes
- Importar clientes desde un archivo CSV
- Normalizar datos inconsistentes
- Evitar registros duplicados

---

## 🧠 Lógica aplicada
Normalización de datos

Antes de guardar los datos se aplican transformaciones como:

Emails en minúscula
Limpieza de teléfonos (espacios y caracteres especiales)
Estandarización de DNI
Manejo de duplicados

---

## 📌 Decisiones técnicas
Se utilizó SQLite para simplificar el entorno de desarrollo.
Se separó la lógica de negocio en service siguiendo la arquitectura de NestJS.
Se priorizó la consistencia de datos sobre la inserción directa.
Se manejaron errores del CSV sin detener la importación completa.
