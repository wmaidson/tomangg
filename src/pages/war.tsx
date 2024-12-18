import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
    Box,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Modal, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Definição de tipo para os usuários
interface User {
    id: number;
    username: string;
    dkp: number;
    eventQuantity: number;
}

export default function War() {

    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]); // Agora será preenchido dinamicamente
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [eventValue, setEventValue] = useState<number>(1);
    const [dpkValue, setDkpValue] = useState<number>(5);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [showSuccessResetModal, setShowSuccessResetModal] = useState(false);
    const [showResetConfirmationModal, setShowResetConfirmationModal ] = useState(false);


    useEffect(() => {
        async function fetchUsers() {
            try {
                const { data } = await axios.get("http://localhost:3333/users"); // Substitua com sua URL
                setUsers(data);
                setFilteredUsers(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        }

        fetchUsers();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredUsers(
            users.filter((user) =>
                user.username.toLowerCase().includes(term)
            )
        );
    };

    const handleSave = async () => {
        if (selectedUsers.length === 0) {
            setShowErrorModal(true); // Exibe modal de erro
        } else {
            try {

                const updates = selectedUsers.map((user) => ({
                    id: user.id,
                    eventQuantity: user.eventQuantity + eventValue,
                    dkp: user.dkp + eventValue * dpkValue,
                }));

                await axios.put("http://localhost:3333/users/bulk-update", { updates });
                await fetchUsers(); // Atualiza os dados após salvar as alterações

                setShowSuccessModal(true); // Exibe modal de sucesso
            } catch (error) {
                console.error("Erro ao salvar dados:", error);
            }
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    const handleBack = () => {
        router.push("/");
    };

    const addUserToStack = (user: User) => {
        if (!selectedUsers.find((u) => u.id === user.id)) {
            setSelectedUsers((prev) => [...prev, user]);
        }
    };

    const removeUserFromStack = (user: User) => {
        setSelectedUsers((prev) =>
            prev.filter((u) => u.id !== user.id)
        );
    };

    const handleCloseSuccessResetModal = () => {
        setShowSuccessResetModal(false);
        setShowResetModal(false);
    };

    const handleReset = async () => {
        try {
            await axios.put("http://localhost:3333/users/reset-events");
            await fetchUsers();
            setShowResetConfirmationModal(false);
            setShowSuccessResetModal(true);
        } catch (error) {
            console.error("Erro ao redefinir eventos:", error);
        }
    };


    const fetchUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:3333/users");
            setUsers(data); // Atualiza o estado dos usuários
            setFilteredUsers(data); // Atualiza os usuários filtrados
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

// useEffect para buscar os dados ao carregar a página
    useEffect(() => {
        fetchUsers(); // Chamada inicial ao carregar o componente
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#23242A",
                color: "#D9D3C9",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 3,
                borderRadius: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "10px 20px",
                }}
            >
                <IconButton
                    onClick={handleBack}
                    sx={{
                        color: "#D9D3C9",
                        ":hover": { color: "#B3B0A8" },
                    }}
                >
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
            </Box>

            {/* Título Principal */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                }}
            >
               Evento da Pedra
            </Typography>

            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    color: "#D9D3C9",
                    padding: 4,
                    borderRadius: 2,
                    width: "50%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                }}
            >
                {/* Título da Tabela */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: 3,
                        textAlign: "center",
                    }}
                >
                    Quantidade de Eventos Realizados
                </Typography>

                {/* Tabela */}
                <TableContainer component={Paper} sx={{ backgroundColor: "#2C2F36" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    Personagem
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    Eventos Realizados
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    DKP
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                        {user.username}
                                    </TableCell>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                        {user.eventQuantity}
                                    </TableCell>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                        {user.eventQuantity * dpkValue}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                    mt: 5,
                }}
            >
                DKP por Evento
            </Typography>

            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    color: "#D9D3C9",
                    padding: 4,
                    borderRadius: 2,
                    width: "50%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                }}
            >
                <TextField
                    label="Busca de usuário"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{
                        backgroundColor: "#3A3D45",
                        input: { color: "#D9D3C9" },
                        label: { color: "#D9D3C9" },
                        mb: 3,
                    }}
                />

                <Box
                    sx={{
                        backgroundColor: "#2C2F36",
                        borderRadius: "10px",
                        padding: 2,
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Selecione um usuário
                    </Typography>
                    <List>
                        {filteredUsers.map((user) => (
                            <ListItem
                                key={user.username} // Usar personagem como identificador único
                                onClick={() => addUserToStack(user)}
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    color: "#D9D3C9",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    ":hover": { backgroundColor: "#4A4E57" },
                                }}
                            >
                                <ListItemText primary={user.username} />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box
                    sx={{
                        backgroundColor: "#2C2F36",
                        borderRadius: "10px",
                        padding: 2,
                        marginTop: 3,
                        minHeight: "150px",
                    }}
                >
                    <Typography variant="h6" sx={{ color: "#D9D3C9", marginBottom: 2 }}>
                        Usuários Selecionados
                    </Typography>
                    <List>
                        {selectedUsers.map((user) => (
                            <ListItem
                                key={user.username} // Usar personagem como identificador único
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    color: "#D9D3C9",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <ListItemText primary={user.username} />
                                <IconButton
                                    onClick={() => removeUserFromStack(user)}
                                    sx={{ color: "#D9D3C9" }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box
                    sx={{
                        marginTop: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            marginTop: 3,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        {/* Grupo 1: Quantidade de Eventos */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="body1">
                                Selecione a quantidade de Eventos
                            </Typography>
                            <TextField
                                type="number"
                                value={eventValue}
                                onChange={(e) => setEventValue(Number(e.target.value))}
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    input: { color: "#D9D3C9" },
                                    width: "80px",
                                    textAlign: "center",
                                }}
                            />
                        </Box>

                        {/* Grupo 2: Quantidade de DKP */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="body1">
                                Selecione a quantidade de DKP
                            </Typography>
                            <TextField
                                type="number"
                                value={dpkValue}
                                onChange={(e) => setDkpValue(Number(e.target.value))}
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    input: { color: "#D9D3C9" },
                                    width: "80px",
                                    textAlign: "center",
                                }}
                            />
                        </Box>
                    </Box>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 3,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: "#D9D3C9",
                            color: "#23242A",
                            ":hover": { backgroundColor: "#B3B0A8" },
                        }}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>

            {/* Modal de Sucesso */}
            {/* Modal de Sucesso */}
            <Modal open={showSuccessModal} onClose={handleCloseSuccessModal}>
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
                    <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 3 }}>
                        Confirmação
                    </Typography>
                    <Typography sx={{ marginBottom: 2, textAlign: "center" }}>
                        Os usuários:
                    </Typography>
                    <Box sx={{ marginBottom: 3, textAlign: "center" }}>
                        {selectedUsers.map((user) => (
                            <Typography
                                key={user.id}
                                sx={{
                                    color: "lightgreen", // Cor verde para os usuários
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    marginBottom: "5px",
                                }}
                            >
                                {user.username}
                            </Typography>
                        ))}
                    </Box>
                    <Typography
                        sx={{
                            marginBottom: 2,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        Realizaram{" "}
                        <span style={{ color: "lightgreen", fontWeight: "bold" }}>
                {eventValue}
            </span>{" "}
                        Eventos e receberam{" "}
                        <span style={{ color: "lightgreen", fontWeight: "bold" }}>
                {selectedUsers.length * eventValue * dpkValue} DKP
            </span>
                        .
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            onClick={handleCloseSuccessModal}
                            sx={{
                                backgroundColor: "#D9D3C9",
                                color: "#23242A",
                                ":hover": { backgroundColor: "#B3B0A8" },
                            }}
                        >
                            OK
                        </Button>
                    </Box>
                </Box>
            </Modal>



            {/* Modal de Erro */}
            <Modal open={showErrorModal} onClose={handleCloseErrorModal}>
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
                    <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 3 }}>
                        Erro
                    </Typography>
                    <Typography sx={{ textAlign: "center", marginBottom: 3 }}>
                        Nenhum membro selecionado.
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            onClick={handleCloseErrorModal}
                            sx={{
                                backgroundColor: "#D9D3C9",
                                color: "#23242A",
                                ":hover": { backgroundColor: "#B3B0A8" },
                            }}
                        >
                            Voltar
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Button
                variant="contained"
                onClick={() => setShowResetModal(true)}
                sx={{
                    mt: 3,
                    backgroundColor: "#D9D3C9",
                    color: "#23242A",
                    ":hover": { backgroundColor: "#B3B0A8" },
                }}
            >
                Redefinir
            </Button>
            <Modal open={showResetModal} onClose={() => setShowResetModal(false)}>
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
                        width: "40%",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 3 }}>
                        Realmente deseja redefinir todos os Eventos?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setShowResetModal(false)}
                            sx={{
                                color: "#D9D3C9",
                                borderColor: "#D9D3C9",
                                ":hover": { backgroundColor: "#3A3D45" },
                            }}
                        >
                            Voltar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleReset}
                            sx={{
                                backgroundColor: "#D9D3C9",
                                color: "#23242A",
                                ":hover": { backgroundColor: "#B3B0A8" },
                            }}
                        >
                            Sim
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={showSuccessResetModal}
                onClose={handleCloseSuccessResetModal}
            >
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
                        width: "40%",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 3 }}>
                        Eventos redefinidos com sucesso!
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleCloseSuccessResetModal}
                        sx={{
                            mt: 2,
                            backgroundColor: "#D9D3C9",
                            color: "#23242A",
                            ":hover": { backgroundColor: "#B3B0A8" },
                        }}
                    >
                        OK
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
