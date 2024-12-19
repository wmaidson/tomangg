import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Modal,
    Typography,
    IconButton,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Weapon {
    id: number;
    description: string;
}

interface User {
    id: number;
    username: string;
    dkp: number;
    weapon1Id: number | null;
    weapon2Id: number | null;
    weapon1: Weapon | null;
    weapon2: Weapon | null;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const [newUser, setNewUser] = useState({
        username: "",
        weapon1Id: "",
        weapon2Id: "",
    });

    const generateWeaponImageURL = (weaponDescription: string | undefined): string => {
        if (!weaponDescription) return ""; // Retorna vazio se não houver descrição
        return `https://tomangg.s3.us-east-2.amazonaws.com/weapons/${weaponDescription.toLowerCase()}.png`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await axios.get<User[]>("http://localhost:3333/users");
                const weaponsRes = await axios.get<Weapon[]>("http://localhost:3333/weapons");
                setUsers(usersRes.data.sort((a, b) => b.dkp - a.dkp));
                setWeapons(weaponsRes.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, []);

    const handleCreateUser = async () => {
        try {
            const { username, weapon1Id, weapon2Id } = newUser;
            if (username && weapon1Id && weapon2Id) {
                await axios.post("http://localhost:3333/users", {
                    username,
                    weapon1Id: parseInt(weapon1Id),
                    weapon2Id: parseInt(weapon2Id),
                });
                setNewUser({ username: "", weapon1Id: "", weapon2Id: "" });
                setCreateModalOpen(false);
                const updatedUsers = await axios.get<User[]>("http://localhost:3333/users");
                setUsers(updatedUsers.data.sort((a, b) => b.dkp - a.dkp));
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) return;

        try {
            await axios.put(`http://localhost:3333/users/${selectedUser.id}`, {
                username: selectedUser.username,
                dkp: selectedUser.dkp,
                weapon1Id: selectedUser.weapon1Id,
                weapon2Id: selectedUser.weapon2Id,
            });
            setEditModalOpen(false);
            const updatedUsers = users.map((u) =>
                u.id === selectedUser.id ? selectedUser : u
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;

        try {
            await axios.delete(`http://localhost:3333/users/${selectedUser.id}`);
            setUsers(users.filter((u) => u.id !== selectedUser.id));
            setDeleteModalOpen(false);
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    };

    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedUser(null);
        setDeleteModalOpen(false);
    };

    const translatedWeapons: { [key: string]: string } = {
        Sword: "Espada e Escudo",
        Spear: "Lança",
        Greatsword: "Montante",
        Longbow: "Arco Longo",
        Crossbow: "Balestra",
        Wand: "Varinha e Tomo",
        Staff: "Cajado",
        Dagger: "Adaga",
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
                padding: 4,
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    padding: 4,
                    borderRadius: 2,
                    width: "80%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginBottom: 4,
                        color: "#D9D3C9",
                    }}
                >
                    Gerenciamento de Usuários
                </Typography>

                <TableContainer component={Paper} sx={{ backgroundColor: "#2C2F36", marginBottom: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#D9D3C9" }}>Nome</TableCell>
                                <TableCell sx={{ color: "#D9D3C9" }}>Armas</TableCell>
                                <TableCell sx={{ color: "#D9D3C9" }}>DKP</TableCell>
                                <TableCell sx={{ color: "#D9D3C9" }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell sx={{ color: "#D9D3C9" }}>{user.username}</TableCell>
                                    <TableCell sx={{ color: "#D9D3C9" }}>
                                        <Box sx={{ display: "flex", gap: "10px" }}>
                                            {user.weapon1 && (
                                                <Image
                                                    src={generateWeaponImageURL(user.weapon1.description)}
                                                    alt={user.weapon1.description}
                                                    width={40}
                                                    height={40}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            )}
                                            {user.weapon2 && (
                                                <Image
                                                    src={generateWeaponImageURL(user.weapon2.description)}
                                                    alt={user.weapon2.description}
                                                    width={40}
                                                    height={40}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: "#D9D3C9" }}>{user.dkp}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleEditUser(user)}
                                            sx={{ color: "#D9D3C9", marginRight: 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => openDeleteModal(user)}
                                            sx={{ color: "#D9D3C9" }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button
                    variant="contained"
                    onClick={() => setCreateModalOpen(true)}
                    sx={{
                        backgroundColor: "#D9D3C9",
                        color: "#23242A",
                        ":hover": { backgroundColor: "#B3B0A8" },
                    }}
                >
                    Criar Usuário
                </Button>
            </Box>

            {/* Modal de Criação de Usuário */}
            <Modal open={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
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
                    <Typography
                        variant="h6"
                        sx={{ textAlign: "center", marginBottom: 3 }}
                    >
                        Criar Usuário
                    </Typography>
                    <TextField
                        label="Nome"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        fullWidth
                        sx={{
                            mb: 3,
                            backgroundColor: "#3A3D45",
                            input: { color: "#D9D3C9" },
                            label: { color: "#D9D3C9" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#D9D3C9",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#B3B0A8",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#D9D3C9",
                                },
                            },
                        }}
                    />
                    <Box sx={{ display: "flex", gap: "10px", marginBottom: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: "#D9D3C9" }}>Arma 1</InputLabel>
                            <Select
                                value={newUser.weapon1Id}
                                onChange={(e) => setNewUser({ ...newUser, weapon1Id: e.target.value })}
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    color: "#D9D3C9",
                                    marginBottom: 3,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#B3B0A8",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: "#D9D3C9",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: "#3A3D45", // Fundo da lista
                                            color: "#D9D3C9", // Cor do texto
                                            "& .MuiMenuItem-root": {
                                                "&.Mui-selected": {
                                                    backgroundColor: "#B3B0A8", // Cor de fundo quando selecionado
                                                    color: "#23242A", // Cor do texto quando selecionado
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
                                {weapons.map((weapon) => (
                                    <MenuItem key={weapon.id} value={weapon.id}>
                                        {translatedWeapons[weapon.description]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: "#D9D3C9" }}>Arma 2</InputLabel>
                            <Select
                                value={newUser.weapon2Id}
                                onChange={(e) => setNewUser({ ...newUser, weapon2Id: e.target.value })}
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    color: "#D9D3C9",
                                    marginBottom: 3,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#B3B0A8",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: "#D9D3C9",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: "#3A3D45", // Fundo da lista
                                            color: "#D9D3C9", // Cor do texto
                                            "& .MuiMenuItem-root": {
                                                "&.Mui-selected": {
                                                    backgroundColor: "#B3B0A8", // Cor de fundo quando selecionado
                                                    color: "#23242A", // Cor do texto quando selecionado
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
                                {weapons.map((weapon) => (
                                    <MenuItem key={weapon.id} value={weapon.id}>
                                        {translatedWeapons[weapon.description]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setCreateModalOpen(false)}
                            sx={{
                                color: "#D9D3C9",
                                borderColor: "#D9D3C9",
                                ":hover": { backgroundColor: "#2C2F36" },
                            }}
                        >
                            Voltar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCreateUser}
                            sx={{
                                backgroundColor: "#D9D3C9",
                                color: "#23242A",
                                ":hover": { backgroundColor: "#B3B0A8" },
                            }}
                        >
                            Criar
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Modal de Confirmação de Exclusão */}
            <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
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
                        sx={{ textAlign: "center", marginBottom: 3 }}
                    >
                        Deseja realmente excluir este usuário?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={closeDeleteModal}
                            sx={{
                                color: "#D9D3C9",
                                borderColor: "#D9D3C9",
                                ":hover": { backgroundColor: "#2C2F36" },
                            }}
                        >
                            Voltar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleDeleteUser}
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


            {/* Modal de Edição */}
            <Modal open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
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
                        Editar Usuário
                    </Typography>
                    {selectedUser && (
                        <>
                            <TextField
                                fullWidth
                                label="Nome"
                                value={selectedUser.username}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        username: e.target.value,
                                    })
                                }
                                sx={{
                                    mb: 3,
                                    backgroundColor: "#3A3D45",
                                    input: { color: "#D9D3C9" },
                                    label: { color: "#D9D3C9" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#D9D3C9",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#B3B0A8",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#D9D3C9",
                                        },
                                    },
                                }}
                            />
                            <Select
                                fullWidth
                                value={selectedUser.weapon1Id || ""}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        weapon1Id: Number(e.target.value),
                                    })
                                }
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    color: "#D9D3C9",
                                    marginBottom: 3,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#B3B0A8",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: "#D9D3C9",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: "#3A3D45", // Fundo da lista
                                            color: "#D9D3C9", // Cor do texto
                                            "& .MuiMenuItem-root": {
                                                "&.Mui-selected": {
                                                    backgroundColor: "#B3B0A8", // Cor de fundo quando selecionado
                                                    color: "#23242A", // Cor do texto quando selecionado
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
                                {weapons.map((weapon) => (
                                    <MenuItem key={weapon.id} value={weapon.id}>
                                        {translatedWeapons[weapon.description] || weapon.description}
                                    </MenuItem>
                                ))}
                            </Select>

                            <Select
                                fullWidth
                                value={selectedUser.weapon2Id || ""}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        weapon2Id: Number(e.target.value),
                                    })
                                }
                                sx={{
                                    backgroundColor: "#3A3D45",
                                    color: "#D9D3C9",
                                    marginBottom: 3,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#B3B0A8",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#D9D3C9",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: "#D9D3C9",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: "#3A3D45", // Fundo da lista
                                            color: "#D9D3C9", // Cor do texto
                                            "& .MuiMenuItem-root": {
                                                "&.Mui-selected": {
                                                    backgroundColor: "#B3B0A8", // Cor de fundo quando selecionado
                                                    color: "#23242A", // Cor do texto quando selecionado
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
                                {weapons.map((weapon) => (
                                    <MenuItem key={weapon.id} value={weapon.id}>
                                        {translatedWeapons[weapon.description] || weapon.description}
                                    </MenuItem>
                                ))}
                            </Select>

                            <TextField
                                fullWidth
                                label="DKP"
                                value={selectedUser?.dkp || ""}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser!,
                                        dkp: parseInt(e.target.value, 10), // Convertendo para número
                                    })
                                }
                                sx={{
                                    mb: 3,
                                    backgroundColor: "#3A3D45",
                                    input: { color: "#D9D3C9" },
                                    label: { color: "#D9D3C9" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#D9D3C9",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#B3B0A8",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#D9D3C9",
                                        },
                                    },
                                }}
                            />

                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => setEditModalOpen(false)}
                                    sx={{
                                        color: "#D9D3C9",
                                        borderColor: "#D9D3C9",
                                        ":hover": { backgroundColor: "#2C2F36" },
                                    }}
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleUpdateUser}
                                    sx={{
                                        backgroundColor: "#D9D3C9",
                                        color: "#23242A",
                                        ":hover": { backgroundColor: "#B3B0A8" },
                                    }}
                                >
                                    Salvar
                                </Button>

                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default UsersPage;
