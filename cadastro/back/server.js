import express from 'express'

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express()

app.use(express.json())

const usuarios = []

//CRIAR ROTAS

app.put('/cadastro/:id', async (req,res)=>{

    await prisma.usuario.update({
        where:{
            id:req.params.id
        },
        data:{
            email:req.body.email,
            name:req.body.name,
            idade:req.body.idade
        }
    })
    
    res.status(201).json({"message":"Usuario Atualizado"})
})

app.delete('/cadastro/:id', async (req,res)=>{

    await prisma.usuario.delete({
        where:{
            id:req.params.id
        }
    })
    
    res.status(201).json({"message":"Usuario Apagado"})
})

app.post('/cadastro', async (req,res)=>{
    
    await prisma.Usuario.create({
        data:{
            email:req.body.email,
            name:req.body.name,
            idade:req.body.idade
        }
    })

    res.status(201).json(req.body)
})

app.get('/cadastro',async(req,res)=>{
    const usuarios = await prisma.Usuario.findMany();
    res.status(200).json(usuarios)
})
//CONFIGURAR PORTA DO SERVIDOR
app.listen(3000,()=>{console.log('SERVIDOR RODANDO!')})