import cors from 'cors';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const app = express();
const prisma = new PrismaClient();


interface User {
    username: string;
    weapon1Id: number;
    weapon2Id: number;
    dkp: number;
}


app.use(cors());
app.use(express.json()); // Para parsear JSON no corpo das requisições

// Rota para criar um usuário

// Rota para obter um usuário pelo ID
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            include: { weapon1: true, weapon2: true },
        });
        res.json(users.map(user => ({
            ...user,
            guildBoss: user.guildBoss // Certifique-se de incluir guildBoss explicitamente
        })));
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

app.post('/users', async (req: Request, res: Response) => {
    const { username, weapon1Id, weapon2Id } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                username,
                weapon1Id,
                weapon2Id,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

app.post('/users/bulk', async (req: Request, res: Response): Promise<void> => {
    const users: User[] = req.body;

    if (!Array.isArray(users)) {
        res.status(400).json({ error: "O corpo da requisição deve ser uma lista de usuários." });
        return;
    }

    try {
        const createdUsers = await prisma.user.createMany({
            data: users.map((user) => ({
                username: user.username,
                weapon1Id: user.weapon1Id,
                weapon2Id: user.weapon2Id,
                dkp: user.dkp,
            })),
        });

        res.status(201).json({ message: "Usuários criados com sucesso.", count: createdUsers.count });
    } catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Erro desconhecido ao criar usuários em massa.",
        });
    }
});


app.put('/users/bulk-update', async (req: Request, res: Response) => {
    const { updates } = req.body;

    if (!Array.isArray(updates)) {
        return res.status(400).json({ error: 'Payload inválido.' });
    }

    try {
        await Promise.all(
            updates.map((update: { id: number; guildBoss?: number; dkp?: number; eventQuantity?: number }) =>
                prisma.user.update({
                    where: { id: update.id },
                    data: {
                        guildBoss: update.guildBoss ?? undefined,
                        dkp: update.dkp ?? undefined,
                        eventQuantity: update.eventQuantity ?? undefined,
                    },
                })
            )
        );

        res.status(200).json({ message: 'Usuários atualizados com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar usuários:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuários.' });
    }
});


app.put('/users/reset-bosses', async (req: Request, res: Response) => {
    try {
        await prisma.user.updateMany({
            data: { guildBoss: 0 },
        });
        res.status(200).json({ message: 'Todos os bosses foram redefinidos para zero.' });
    } catch (error) {
        console.error('Erro ao redefinir bosses:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Erro desconhecido.' });
        }
    }
});

app.put('/users/reset-events', async (req: Request, res: Response) => {
    try {
        await prisma.user.updateMany({
            data: { eventQuantity: 0 },
        });
        res.status(200).json({ message: 'Todos os eventos foram redefinidos para zero.' });
    } catch (error) {
        console.error('Erro ao redefinir eventos:', error);
        res.status(500).json({ error: 'Erro ao redefinir eventos.' });
    }
});




// Rota para atualizar um usuário
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, dkp } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { username, dkp },
        });
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Rota para deletar um usuário
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.delete({
            where: { id: Number(id) },
        });
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Rota para listar todas as armas
app.get('/weapons', async (req, res) => {
    try {
        const weapons = await prisma.weapons.findMany();
        res.json(weapons);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Rota para criar uma nova arma
app.post('/weapons', async (req, res) => {
    const { description } = req.body;

    try {
        const weapon = await prisma.weapons.create({
            data: { description },
        });
        res.status(201).json(weapon);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.post('/auctions', async (req, res) => {
    const { description, startAt, endAt } = req.body;

    try {
        const auction = await prisma.auction.create({
            data: {
                description,
                startAt: new Date(startAt),
                endAt: new Date(endAt),
            },
        });
        res.status(201).json(auction);
    } catch (error) {
        console.error('Erro ao criar leilão:', error);
        res.status(500).json({ error: 'Erro ao criar leilão.' });
    }
});



app.get('/auctions', async (req, res) => {
    try {
        const auctions = await prisma.auction.findMany({
            include: { currentBidUser: true },
        });
        res.json(auctions);
    } catch (error) {
        console.error('Erro ao listar leilões:', error);
        res.status(500).json({ error: 'Erro ao listar leilões.' });
    }
});


app.put('/auctions/bid/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, bidDKP } = req.body;

    try {
        // Verificar o leilão e se ele está aberto
        const auction = await prisma.auction.findUnique({
            where: { id: Number(id) },
            include: { currentBidUser: true },
        });

        if (!auction || auction.status !== 'aberto') {
            return res.status(400).json({ error: 'Leilão não está aberto.' });
        }

        // Verificar se o usuário tem DKP suficiente
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.dkp < bidDKP) {
            return res.status(400).json({ error: 'DKP insuficiente.' });
        }

        // Se houver um lance atual, devolver os DKPs ao usuário anterior
        if (auction.currentBidUserId) {
            const currentBidDKP = auction.currentBidDKP ?? 0; // Garantir valor padrão
            await prisma.user.update({
                where: { id: auction.currentBidUserId },
                data: { dkp: { increment: currentBidDKP } },
            });
        }

        // Deduzir os DKPs do novo usuário e atualizar o lance no leilão
        await prisma.user.update({
            where: { id: userId },
            data: { dkp: { decrement: bidDKP } },
        });

        const updatedAuction = await prisma.auction.update({
            where: { id: Number(id) },
            data: {
                currentBidUserId: userId,
                currentBidDKP: bidDKP,
            },
        });

        res.json(updatedAuction);
    } catch (error) {
        console.error('Erro ao dar lance:', error);
        res.status(500).json({ error: 'Erro ao dar lance.' });
    }
});
