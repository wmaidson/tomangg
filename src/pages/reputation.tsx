import React, {useState} from "react";
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
    IconButton, TextField, List, ListItem, ListItemText, Modal, Button, MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Definição de tipo para os usuários
interface User {
    posicao: number;
    personagem: string;
    reputation: number;
}

export default function Reputation() {
    const router = useRouter();

    // Lista de usuários com reputação
    const users: User[] = [
        { posicao: 1, personagem: "FranLDV", reputation: 9542 },
        { posicao: 2, personagem: "DamaDasTrevas", reputation: 7289 },
        { posicao: 3, personagem: "SPLAXSH7", reputation: 6235 },
        { posicao: 4, personagem: "LionGreenwich", reputation: 500 },
    ];

    // Função para calcular o DKP baseado na reputação
    const calculateDkp = (reputation: number): number => {
        return Math.floor(reputation / 1000);
    };

    const handleBack = () => {
        router.push("/"); // Redireciona para a página inicial
    };

    const [searchTerm, setSearchTerm] = useState<string>(""); // Termo de busca
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users); // Lista filtrada
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]); // Usuários selecionados
    const [openEditModal, setOpenEditModal] = useState<boolean>(false); // Controle da modal de edição
    const [editingUser, setEditingUser] = useState<User | null>(null); // Usuário em edição

    // Filtrar usuários pelo nome
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredUsers(
            users.filter((user) =>
                user.personagem.toLowerCase().includes(term)
            )
        );
    };

    // Adicionar usuário à lista selecionada
    const addUserToStack = (user: User) => {
        if (!selectedUsers.find((u) => u.posicao === user.posicao)) {
            setSelectedUsers((prev) => [...prev, user]);
        }
    };

    // Abrir modal de edição
    const handleEditReputation = (user: User) => {
        setEditingUser(user);
        setOpenEditModal(true);
    };

    // Fechar modal de edição
    const handleCloseModal = () => {
        setEditingUser(null);
        setOpenEditModal(false);
    };

    // Salvar edição da reputação
    const handleSaveReputation = () => {
        if (editingUser) {
            setSelectedUsers((prev) =>
                prev.map((user) =>
                    user.posicao === editingUser.posicao
                        ? { ...user, reputation: editingUser.reputation }
                        : user
                )
            );
        }
        handleCloseModal();
    };

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
                        color: "#D9D3C9", // Cor clara da paleta
                        ":hover": { color: "#B3B0A8" }, // Cor ao passar o mouse
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
                Reputação da Guild
            </Typography>

            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    color: "#D9D3C9",
                    padding: 4,
                    borderRadius: 2,
                    width: "80%",
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
                    Rank de Reputação
                </Typography>

                {/* Tabela */}
                <TableContainer component={Paper} sx={{ backgroundColor: "#2C2F36" }}>
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
                                    Reputação
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    DKP
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.posicao}>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                        {user.posicao}
                                    </TableCell>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                        {user.personagem}
                                    </TableCell>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                        {user.reputation}
                                    </TableCell>
                                    <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                        {calculateDkp(user.reputation)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>


            {/* Título Principal */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                    mt: 5,
                }}
            >
                Edição de Reputação
            </Typography>

            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    color: "#D9D3C9",
                    padding: 4,
                    borderRadius: 2,
                    width: "80%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                }}
            >
                {/* Campo de Busca */}
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

                {/* Lista de Resultados */}
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
                                key={user.posicao}
                                button
                                onClick={() => addUserToStack(user)}
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    color: "#D9D3C9",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    ":hover": { backgroundColor: "#4A4E57" },
                                }}
                            >
                                <ListItemText
                                    primary={`${user.personagem} (Reputação: ${user.reputation})`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Lista de Usuários Selecionados */}
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
                                key={user.posicao}
                                button
                                onClick={() => handleEditReputation(user)}
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    color: "#D9D3C9",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <ListItemText
                                    primary={`${user.personagem} (Reputação: ${user.reputation})`}
                                />
                            </ListItem>
                        ))}
                    </List>
                    {/* Botão Limpar Lista */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 2, // Espaço acima do botão
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => setSelectedUsers([])} // Limpa a lista
                            sx={{
                                backgroundColor: "#D9D3C9",
                                color: "#23242A",
                                ":hover": { backgroundColor: "#B3B0A8" },
                            }}
                        >
                            Limpar Lista
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Modal de Edição */}
            <Modal open={openEditModal} onClose={handleCloseModal}>
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
                        width: "30%",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ marginBottom: "20px", textAlign: "center" }}
                    >
                        Editar Reputação
                    </Typography>
                    {editingUser && (
                        <Box>
                            <Typography variant="body1" sx={{ mb: 5}}>
                                Usuário: {editingUser.personagem}
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                label="Selecione o Usuário"
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                sx={{
                                    marginBottom: 3,
                                    backgroundColor: "#3A3D45",
                                    borderRadius: "5px",
                                    color: "#D9D3C9",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9", // Cor da borda padrão
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#B3B0A8", // Cor da borda ao passar o mouse
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9", // Cor da borda quando o campo está focado
                                    },
                                    "& .MuiSelect-icon": {
                                        color: "#D9D3C9", // Cor do ícone de dropdown
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: "#3A3D45", // Fundo da lista
                                            color: "#D9D3C9", // Cor do texto da lista
                                            borderRadius: "5px",
                                            "& .MuiMenuItem-root": {
                                                "&.Mui-selected": {
                                                    backgroundColor: "#B3B0A8", // Fundo do item selecionado
                                                    color: "#23242A", // Texto do item selecionado
                                                },
                                                "&.Mui-selected:hover": {
                                                    backgroundColor: "#D9D3C9", // Fundo ao passar o mouse no item selecionado
                                                    color: "#23242A", // Texto ao passar o mouse no item selecionado
                                                },
                                                "&:hover": {
                                                    backgroundColor: "#2C2F36", // Fundo ao passar o mouse nos itens
                                                    color: "#D9D3C9", // Texto ao passar o mouse nos itens
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                {users.map((user) => (
                                    <MenuItem
                                        key={user.id}
                                        value={user.id}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between", // Espaça o nome do personagem e o DKP
                                            alignItems: "center",
                                            padding: "10px",
                                        }}
                                    >
                                        <span>{user.username}</span>
                                        <span style={{ color: "#B3B0A8", fontSize: "0.9rem" }}>
                                            ({user.dkp} DKP disponíveis)
                                         </span>
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: 3,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={handleCloseModal}
                                    sx={{
                                        color: "#D9D3C9",
                                        borderColor: "#D9D3C9",
                                        ":hover": { backgroundColor: "#2C2F36" },
                                        mr: 2,
                                    }}
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSaveReputation}
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
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
