import React from "react";
import {
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

export default function Rules() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/"); // Voltar para a página inicial
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
                justifyContent: "center",
                padding: 4,
            }}
        >
            {/* Botão para voltar */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 4,
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
                    marginBottom: 4,
                    textAlign: "center",
                }}
            >
                Regras da Guild
            </Typography>

            {/* Caixa principal das regras */}
            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    borderRadius: 2,
                    padding: 4,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    width: "50%",
                    marginBottom: 4,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        marginBottom: 2,
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Normas de conduta
                </Typography>
                <Typography  sx={{ marginBottom: 2 }}>
                    <strong>1. Respeito é a base</strong>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    - Evite discussões ou comentários ofensivos no chat da guilda.
                    <br />- Respeite as opiniões, diferenças e o tempo de cada membro.
                </Typography>

                <Typography sx={{ marginBottom: 2 }}>
                    <strong>2. Participação ativa</strong>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    - Participe regularmente de atividades da guilda (Boss, eventos, PvP, etc.).
                    <br />- Avise caso precise se ausentar por um período prolongado.
                </Typography>

                <Typography sx={{ marginBottom: 2 }}>
                    <strong>3. Comunicação eficiente</strong>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    - Utilize os canais designados (como Discord ou chat da guilda) para organização de eventos e questões importantes.
                    <br />- Mantenha o chat limpo e evite spam ou mensagens irrelevantes.
                </Typography>

                <Typography sx={{ marginBottom: 2 }}>
                    <strong>4. Colaboração entre membros</strong>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    - Ajude novos jogadores sempre que possível.
                    <br />- Compartilhe dicas, itens e recursos quando não forem essenciais para você.
                </Typography>

                <Typography sx={{ marginBottom: 2 }}>
                    <strong>5. Hierarquia e liderança</strong>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    - Respeite as decisões dos líderes e cargos administrativos.
                    <br />- Questões ou problemas devem ser levados à liderança em privado, se necessário.
                </Typography>

                <Typography sx={{ marginBottom: 2 }}>
                    <strong>6. Organização de eventos</strong>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    - Responda com antecedência ao planejamento de eventos.
                    <br />- Chegue no horário combinado com o equipamento e suprimentos necessários.
                </Typography>

                <Typography sx={{ marginBottom: 2 }}>
                    <strong>7. Regras de loot</strong>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    - Siga as regras de distribuição de loot (ex.: DKP).
                </Typography>

                <Typography sx={{ marginBottom: 2 }}>
                    <strong>8. Proibição de atividades negativas</strong>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    - Não participe de atividades que prejudiquem outros membros ou a reputação da guilda (como trapaças ou trollagem).
                </Typography>

                <Typography sx={{ marginBottom: 2 }}>
                    <strong>9. Atitude proativa</strong>
                </Typography>
                <Typography>
                    - Busque melhorar sua habilidade no jogo e o equipamento de sua classe.
                    <br />- Seja engajado em conversas e iniciativas da guilda.
                </Typography>
            </Box>

            {/* Caixa separada para regras do leilão */}
            <Box
                sx={{
                    backgroundColor: "#2C2F36",
                    borderRadius: 2,
                    padding: 4,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    width: "50%",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        marginBottom: 2,
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Regras do Leilão de Itens da Guild
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    <strong>1. Incremento de Lances:</strong>
                    <br />- Os lances devem ser feitos em incrementos de, no mínimo,  <strong>1 DKP </strong>.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    <strong>2. Intervalo entre Lances:</strong>
                    <br />- Cada jogador pode dar  <strong>apenas um lance a cada 30 minutos </strong>, com o chat de lances configurado para restringir essa frequência.
                </Typography>
                <Typography>
                    <strong>3. Visibilidade:</strong>
                    <br />- Após o término, o leilão ficará  <strong>invisível para todos após 3 dias </strong>, mas a liderança da guild ainda terá acesso às informações para auditoria ou referência futura.
                </Typography>
            </Box>
        </Box>
    );
}
