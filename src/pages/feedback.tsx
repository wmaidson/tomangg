import React, { useState } from "react";
import { useRouter } from "next/router";
import {
    Box,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Feedback() {
    const router = useRouter();

    const users = [
        { id: 1, personagem: "FranLDV" },
        { id: 2, personagem: "DamaDasTrevas" },
        { id: 3, personagem: "SPLAXSH7" },
        { id: 4, personagem: "LionGreenwich" },
    ];

    const usersfeedback = [
        { id: 1, username: "FranLDV" , title: "Naofomih joga muito", description: "O cara amassou geral"},
        { id: 2, username: "DamaDasTrevas", title: "Roubaram meu item", description: " O FranLDV roubou meu item"},
        { id: 3, username: "SPLAXSH7", title: "Dois para mim, zero para você", description: "o FranLDV pegou 2 itens para ele"},
    ];

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [feedback, setFeedback] = useState<string>("");
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [feedbackSearch, setFeedbackSearch] = useState<string>("");
    const [filteredFeedbacks, setFilteredFeedbacks] = useState(usersfeedback);
    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredUsers(
            users.filter((user) =>
                user.personagem.toLowerCase().includes(term)
            )
        );
    };

    const handleSelectUser = (user: any) => {
        setSelectedUser(user);
    };

    const handleClearUser = () => {
        setSelectedUser(null);
    };

    const handleClearText = () => {
        setFeedback("");
    };

    const handleSendFeedback = () => {
        if (!selectedUser) {
            setShowErrorModal(true);
            setErrorMessage("Por favor, selecione um usuário.");
        } else if (!feedback.trim()) {
            setShowErrorModal(true);
            setErrorMessage("Por favor, insira sua dúvida, sugestão, feedback ou reclamação.");
        } else {
            setShowSuccessModal(true);
            setFeedback("");
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

    const handleFeedbackSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setFeedbackSearch(searchTerm);
        setFilteredFeedbacks(
            usersfeedback.filter((feedback) =>
                feedback.title.toLowerCase().includes(searchTerm)
            )
        );
    };

    const handleOpenFeedbackModal = (feedback: any) => {
        setSelectedFeedback(feedback);
        setIsFeedbackModalOpen(true);
    };

    const handleCloseFeedbackModal = () => {
        setSelectedFeedback(null);
        setIsFeedbackModalOpen(false);
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
                borderRadius: 2,
            }}
        >
            {/* Botão de Voltar */}
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

            {/* Título */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                    textAlign: "center",
                }}
            >
                Dúvidas e Reclamações
            </Typography>

            {/* Busca de Usuário */}
            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    borderRadius: 2,
                    padding: 4,
                    width: "50%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    marginBottom: 4,
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

                <List>
                    {filteredUsers.map((user) => (
                        <ListItem
                            key={user.id}
                            component="button"
                            onClick={() => handleSelectUser(user)}
                            sx={{
                                backgroundColor: "#3A3D45",
                                color: "#D9D3C9",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                ":hover": { backgroundColor: "#4A4E57" },
                                padding: 2,
                            }}
                        >
                            <ListItemText primary={user.personagem} />
                        </ListItem>
                    ))}
                </List>

                {selectedUser && (
                    <>
                        <Typography
                            sx={{
                                mb: 2,
                                fontWeight: "bold",
                                color: "#D9D3C9",
                                textAlign: "center",
                            }}
                        >
                            Usuário Selecionado:{" "}
                            <span style={{ color: "lightgreen" }}>
                        {selectedUser.personagem}
                    </span>
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#3A3D45",
                                padding: 2,
                                borderRadius: "5px",
                            }}
                        >
                            <Typography>{selectedUser.personagem}</Typography>
                            <IconButton
                                onClick={handleClearUser}
                                sx={{ color: "#D9D3C9" }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </>
                )}
            </Box>

            {/* Campo de Texto e Botões */}
            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    borderRadius: 2,
                    padding: 4,
                    width: "50%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                }}
            >
                <TextField
                    label="Título"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        backgroundColor: "#3A3D45",
                        input: { color: "#D9D3C9" },
                        label: { color: "#D9D3C9" },
                        mb: 3,
                    }}
                />
                <TextField
                    label="Digite sua dúvida, sugestão, fedback ou reclamação"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    sx={{
                        backgroundColor: "#3A3D45",
                        textarea: { color: "#D9D3C9" },
                        input: { color: "#D9D3C9" },
                        label: { color: "#D9D3C9" },
                        mb: 3,
                    }}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleClearText}
                        sx={{
                            color: "#D9D3C9",
                            borderColor: "#D9D3C9",
                            ":hover": { backgroundColor: "#2C2F36", borderColor: "#B3B0A8" },
                        }}
                    >
                        Limpar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSendFeedback}
                        sx={{
                            backgroundColor: "#D9D3C9",
                            color: "#23242A",
                            ":hover": { backgroundColor: "#B3B0A8" },
                        }}
                    >
                        Enviar
                    </Button>
                </Box>
            </Box>

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
                        width: "30%",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ color: "lightgreen", marginBottom: 2 }}
                    >
                        Feedback enviado com sucesso!
                    </Typography>
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
                        width: "30%",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ color: "red", marginBottom: 2 }}
                    >
                        {errorMessage}
                    </Typography>
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
            </Modal>

            {/* Título Feedback e Busca */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                    textAlign: "center",
                    mt: 5
                }}
            >
                Feedback
            </Typography>

            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    borderRadius: 2,
                    padding: 4,
                    width: "50%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    marginBottom: 4,
                }}
            >

                <TextField
                    label="Busca por Título"
                    variant="outlined"
                    fullWidth
                    value={feedbackSearch}
                    onChange={handleFeedbackSearch}
                    sx={{
                        backgroundColor: "#3A3D45",
                        input: { color: "#D9D3C9" },
                        label: { color: "#D9D3C9" },
                        mb: 3,
                    }}
                />
                <List>
                    {filteredFeedbacks.map((feedback) => (
                        <ListItem
                            key={feedback.id}
                            onClick={() => handleOpenFeedbackModal(feedback)}
                            sx={{
                                backgroundColor: "#3A3D45",
                                color: "#D9D3C9",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                ":hover": { backgroundColor: "#4A4E57" },
                                padding: 2,
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold", color: "#D9D3C9" }}
                                    >
                                         Título: {feedback.title}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ color: "#B3B0A8" }}
                                    >
                                        Quem escreveu: {feedback.username}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Modal open={isFeedbackModalOpen} onClose={handleCloseFeedbackModal}>
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
                        {selectedFeedback && (
                            <>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center", // Alinha os textos verticalmente
                                        marginBottom: 2, // Espaçamento inferior
                                    }}
                                >
                                    <Typography
                                        variant="h5" // Tamanho maior para o texto estático "Título:"
                                        sx={{
                                            fontWeight: "bold", // Negrito para destaque
                                            marginRight: 2, // Espaçamento entre os itens
                                            color: "#D9D3C9",
                                        }}
                                    >
                                        Título:
                                    </Typography>
                                    <Typography
                                        variant="h6" // Tamanho normal para o valor dinâmico
                                        sx={{
                                            color: "#B3B0A8",
                                        }}
                                    >
                                        {selectedFeedback.title}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center", // Alinha os textos verticalmente
                                        marginBottom: 3, // Espaçamento inferior
                                    }}
                                >
                                    <Typography
                                        variant="h5" // Tamanho maior para o texto estático "Descrição:"
                                        sx={{
                                            fontWeight: "bold",
                                            marginRight: 2,
                                            color: "#D9D3C9",
                                        }}
                                    >
                                        Descrição:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "#B3B0A8",
                                        }}
                                    >
                                        {selectedFeedback.description}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center", // Alinha os textos verticalmente
                                        marginBottom: 4, // Espaçamento inferior
                                    }}
                                >
                                    <Typography
                                        variant="h5" // Tamanho maior para o texto estático "Escrito por:"
                                        sx={{
                                            fontWeight: "bold",
                                            marginRight: 2,
                                            color: "#D9D3C9",
                                        }}
                                    >
                                        Escrito por:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "#B3B0A8",
                                        }}
                                    >
                                        {selectedFeedback.username}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleCloseFeedbackModal}
                                        sx={{
                                            backgroundColor: "#D9D3C9",
                                            color: "#23242A",
                                            ":hover": { backgroundColor: "#B3B0A8" },
                                        }}
                                    >
                                        Fechar
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
}
