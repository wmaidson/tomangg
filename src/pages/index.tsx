import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button, Modal, Checkbox, Link,
} from "@mui/material";
import axios from "axios";

export default function Home() {


    const router = useRouter();
    const [users, setUsers] = useState([]);

    const [openEdit, setOpenEdit] = useState(false);
    const [editedEvents, setEditedEvents] = useState([]);

    // Funções para abrir/fechar modal de edição
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);


    const [open, setOpen] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);

    // Funções para abrir/fechar modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // Dados para a tabela
    const rows = [

        { posicao: 1, personagem: "FranLDV", armas: ["dagger", "wand"], DKP: 750 },
        { posicao: 2, personagem: "DamaDasTrevas", armas: ["greatsword", "wand"], DKP: 500 },
        { posicao: 3, personagem: "SPLAXSH7", armas: ["crossbow", "staff"], DKP: 350 },
        { posicao: 4, personagem: "LionGreenwich", armas: ["sword", "longbow"], DKP: 100 },
    ];

    // Dados para os eventos
    const [eventos, setEventos] = useState([
        {
            id: 1,
            titulo: "Bosses da Guild",
            imagem: "/events/guildboss.png",
            DKP: 5,
            descricao: "A cada boss derrotado, você recebe",
            link: "/guildboss", // Caminho para a página de GuildBoss
        },
        {
            id: 2,
            titulo: "Reputação",
            imagem: "/events/reputation.png",
            DKP: 1,
            descricao: "A cada 1.000 pontos de reputação, você recebe",
            link: "/reputation", // Caminho para a página de Reputação
        },
        {
            id: 3,
            titulo: "Evento da Pedra",
            imagem: "/events/war.png",
            DKP: 10,
            descricao: "A cada evento participado você recebe",
            link: "/war", // Caminho para a página de Evento da Pedra
        },
        {
            id: 4,
            titulo: "Cerco ao Castelo",
            imagem: "/events/tower.png",
            DKP: 20,
            descricao: "A cada evento participado você recebe",
            link: "/castle", // Caminho para a página de Cerco ao Castelo
        },
    ]);

    const navigateToEvent = (link: string) => {
        router.push(link); // Redireciona para o caminho especificado
    };

    // Dados para informacoes
    const [information, setInformation] = useState([
        {
            id: 1,
            titulo: "Leilão",
            imagem: "/information/auction.png",
            link: "/auction",
        },
        {
            id: 2,
            titulo: "Regras",
            imagem: "/information/rules2.png",
            link: "/rules",
        },
        {
            id: 3,
            titulo: "Duvidas e Reclamações",
            imagem: "/information/faq.png",
            link: "/feedback",
        },
    ]);

    const handleInputChange = (id: any, field: any, value: any,) => {
        setEditedEvents((prev: any) =>
            prev.map((evento: any) =>
                evento.id === id ? { ...evento, [field]: value } : evento
            )
        );
    };

    // Função para salvar as edições
    const handleSaveEdit = () => {
        setEventos(editedEvents); // Atualiza os dados com os editados
        alert("Eventos atualizados com sucesso!");
        handleCloseEdit();
    };

    // Inicializa os dados editados ao abrir a modal
    const initializeEditData = () => {
        setEditedEvents([...eventos]);
        handleOpenEdit();
    };

    const handleSelectEvent = (eventId: any) => {
        setSelectedEvents((prev: any) =>
            prev.includes(eventId)
                ? prev.filter((id: any) => id !== eventId)
                : [...prev, eventId]
        );
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3333/users"); // Substitua pelo seu endpoint
                const sortedUsers = response.data.sort((a, b) => b.dkp - a.dkp); // Ordenar por DKP (decrescente)
                setUsers(sortedUsers);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#23242A",
                color: "#D9D3C9",
                minHeight: "100vh",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
            }}
        >
            <h1 style={{ marginBottom: "20px" }}>TOMAN GG</h1>

            {/* Título e botões de ações para eventos */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#D9D3C9", marginBottom: "10px", mb: 5, mt:5 }}>
                    Eventos
                </Typography>

                <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#D9D3C9",
                            borderColor: "#D9D3C9",
                            ":hover": { backgroundColor: "#2C2F36", borderColor: "#D9D3C9" },
                        }}
                        onClick={() => alert("Editar evento")}
                    >
                        Criar
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#D9D3C9",
                            borderColor: "#D9D3C9",
                            ":hover": { backgroundColor: "#2C2F36", borderColor: "#D9D3C9" },
                        }}
                        onClick={initializeEditData}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#D9D3C9",
                            borderColor: "#D9D3C9",
                            ":hover": { backgroundColor: "#2C2F36", borderColor: "#D9D3C9" },
                        }}
                        onClick={handleOpen}
                    >
                        Excluir
                    </Button>
                </Box>
            </Box>



            {/* Modal para exclusão */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#2C2F36",
                        color: "#D9D3C9",
                        padding: 4,
                        borderRadius: "10px",
                        width: "50%",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "bold", textAlign: "center"}}>
                        Excluir Eventos
                    </Typography>
                    <TableContainer component={Paper} sx={{ backgroundColor: "#2C2F36", color: "#D9D3C9", mt: 5}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>Selecionar</TableCell>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>Título</TableCell>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>DKP</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {eventos.map((evento) => (
                                    <TableRow key={evento.id}>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Checkbox
                                                sx={{ color: "#D9D3C9", "&.Mui-checked": { color: "#D9D3C9" } }}
                                                checked={selectedEvents.includes(evento.id)}
                                                onChange={() => handleSelectEvent(evento.id)}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>{evento.titulo}</TableCell>
                                        <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>{evento.DKP}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Botão de confirmação */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2}}>
                        <Button
                            variant="outlined"
                            sx={{
                                mr: 2,
                                color: "#D9D3C9",
                                borderColor: "#D9D3C9",
                                ":hover": { backgroundColor: "#2C2F36", borderColor: "#D9D3C9" },
                            }}
                            onClick={handleClose}
                        >
                            Voltar
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#D9D3C9",
                                color: "#23242A",
                                ":hover": { backgroundColor: "#B3B0A8" },
                            }}
                            onClick={() => {
                                alert(`Eventos excluídos: ${selectedEvents.join(", ")}`);
                                handleClose();
                            }}
                        >
                            Confirmar Exclusão
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Grade de eventos */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    width: "80%",
                    marginBottom: "30px",
                }}
            >
                {eventos.map((evento) => (
                    <Box
                        key={evento.id}
                        sx={{
                            textAlign: "center",
                            backgroundColor: "#2C2F36",
                            borderRadius: "10px",
                            padding: "20px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                        }}
                    >

                        {/* Título do evento */}
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#D9D3C9",
                                marginBottom: "10px",
                                fontWeight: "bold",
                            }}
                        >
                            {evento.titulo}
                        </Typography>

                        <Link href={evento.link}>
                        {/* Imagem do evento */}
                        <img
                            src={evento.imagem}
                            alt={`Evento ${evento.id}`}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                marginBottom: "10px",
                            }}
                        />
                        </Link>

                        {/* Descrição do evento */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#D9D3C9",
                                marginBottom: "10px",
                                fontSize: "14px",
                            }}
                        >
                            {evento.descricao}
                        </Typography>

                        {/* Valor DKP fixo */}
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#D9D3C9",
                                fontWeight: "bold",
                            }}
                        >
                            DKP: {evento.DKP}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Título para a tabela */}
            <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Ranking de DKP</h2>

            {/* Tabela de ranking */}
            <TableContainer
                component={Paper}
                sx={{
                    backgroundColor: "#2C2F36",
                    color: "#D9D3C9",
                    width: "80%",
                    maxHeight: "400px", // Altura máxima da tabela com rolagem
                    overflowY: "auto", // Rolagem vertical
                    "&::-webkit-scrollbar": {
                        width: "10px", // Largura do scrollbar
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#3A3D45", // Cor do "polegar" (barra que rola)
                        borderRadius: "5px", // Bordas arredondadas
                        border: "2px solid #23242A", // Borda ao redor do polegar
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#B3B0A8", // Cor ao passar o mouse no polegar
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#23242A", // Cor do "trilho" (fundo da rolagem)
                    },
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                Posição
                            </TableCell>
                            <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                Personagem
                            </TableCell>
                            <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                Armas
                            </TableCell>
                            <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                DKP
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    {user.username}
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    <Box sx={{ display: "flex", gap: "10px" }}>
                                        {user.weapon1 && (
                                            <img
                                                src={`/weapons/${user.weapon1.description}.png`}
                                                alt={user.weapon1.description}
                                                style={{ width: "40px", height: "40px" }}
                                            />
                                        )}
                                        {user.weapon2 && (
                                            <img
                                                src={`/weapons/${user.weapon2.description}.png`}
                                                alt={user.weapon2.description}
                                                style={{ width: "40px", height: "40px" }}
                                            />
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    {user.dkp}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Grade de eventos */}
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#D9D3C9", marginBottom: "10px", mb: 5, mt:5 }}>
                informações
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    width: "80%",
                    marginBottom: "30px",
                }}
            >
                {information.map((information) => (
                    <Box
                        key={information.id}
                        sx={{
                            textAlign: "center",
                            backgroundColor: "#2C2F36",
                            borderRadius: "10px",
                            padding: "20px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        {/* Título do evento */}
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#D9D3C9",
                                marginBottom: "10px",
                                fontWeight: "bold",
                            }}
                        >
                            {information.titulo}
                        </Typography>


                        <Link href={information.link}>
                        {/* Imagem do evento */}
                        <img
                            src={information.imagem}
                            alt={`information ${information.id}`}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                marginBottom: "10px",
                            }}
                        />
                        </Link>

                    </Box>
                ))}
            </Box>
        </Box>
    );
}
