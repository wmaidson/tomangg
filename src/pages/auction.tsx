import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    MenuItem,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

interface User {
    id: number;
    username: string;
    dkp: number;
}

interface Auction {
    id: number;
    description: string;
    startAt: string;
    endAt: string;
    status: string;
    currentBidDKP: number | null;
    currentBidUser: User | null;
}

export default function Auction() {
    const [auctions, setAuctions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [bidValue, setBidValue] = useState(0);
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para mensagens de erro
    const [showErrorModal, setShowErrorModal] = useState(false); // Controle do modal de erro

    const handleOpenModal = (auction) => {
        setSelectedAuction(auction);
        setShowModal(true);
    };

    const handleBid = async () => {
        if (!selectedUser || bidValue <= 0) {
            alert("Selecione um usuário e insira um valor válido.");
            return;
        }

        try {
            await axios.put(`http://localhost:3333/auctions/bid/${selectedAuction.id}`, {
                userId: selectedUser,
                bidDKP: bidValue,
            });
            await fetchAuctions(); // Atualiza a lista de leilões
            setShowModal(false); // Fecha o modal
        } catch (error) {
            console.error("Erro ao dar lance:", error);
        }
    };

    // Fetch leilões
    const fetchAuctions = async () => {
        try {
            const { data } = await axios.get("http://localhost:3333/auctions");
            setAuctions(data);
        } catch (error) {
            console.error("Erro ao buscar leilões:", error);
        }
    };

    // Fetch usuários
    const fetchUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:3333/users");
            setUsers(data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    useEffect(() => {
        fetchAuctions();
        fetchUsers();
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#23242A",
                color: "#D9D3C9",
                minHeight: "100vh",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Título */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    marginBottom: 4,
                    textAlign: "center",
                }}
            >
                Leilão da Guild
            </Typography>

            {/* Tabela */}
            <Box
                sx={{
                    width: "80%",
                    backgroundColor: "#2C2F36",
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                Descrição
                            </TableCell>
                            <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                Data de Início
                            </TableCell>
                            <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                Data de Fim
                            </TableCell>
                            <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                Status
                            </TableCell>
                            <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                Maior Lance
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {auctions.map((auction) => (
                            <TableRow
                                key={auction.id}
                                onClick={() => handleOpenModal(auction)}
                                sx={{
                                    cursor: "pointer",
                                    ":hover": { backgroundColor: "#3A3D45" },
                                }}
                            >
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    {auction.description}
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    {new Date(auction.startAt).toLocaleString()}
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    {new Date(auction.endAt).toLocaleString()}
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    {auction.status}
                                </TableCell>
                                <TableCell sx={{ color: "#D9D3C9", textAlign: "center" }}>
                                    {auction.currentBidDKP
                                        ? `${auction.currentBidDKP} DKP por ${auction.currentBidUser?.username}`
                                        : "Nenhum lance"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            {/* Modal */}
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box
                    sx={{
                        backgroundColor: "#2C2F36",
                        color: "#D9D3C9",
                        borderRadius: 2,
                        padding: 4,
                        margin: "auto",
                        maxWidth: 400,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 3, textAlign: "center" }}>
                        Dar Lance
                    </Typography>
                    <TextField
                        select
                        fullWidth
                        label="Selecione o Usuário"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
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
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.username} ({user.dkp} DKP disponíveis)
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        type="number"
                        label="Valor do Lance"
                        value={bidValue}
                        onChange={(e) => setBidValue(Number(e.target.value))}
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
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: "#D9D3C9",
                            color: "#23242A",
                            ":hover": { backgroundColor: "#B3B0A8" },
                        }}
                        onClick={handleBid}
                    >
                        Confirmar Lance
                    </Button>



                    <Modal open={showErrorModal} onClose={() => setShowErrorModal(false)}>
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
                            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 3 }}>
                                Erro
                            </Typography>
                            <Typography sx={{ textAlign: "center", marginBottom: 3 }}>
                                {errorMessage}
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    variant="contained"
                                    onClick={() => setShowErrorModal(false)}
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


                </Box>
            </Modal>
        </Box>
    );
}
