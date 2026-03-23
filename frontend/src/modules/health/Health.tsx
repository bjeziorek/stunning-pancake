import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useGatewayPing } from "../../app/hooks/useGatewayPing";
import { useProgressWS } from "../../app/hooks/useProgressWS";


export default function Health() {
  const { online, ping } = useGatewayPing();
  const { progress, done } = useProgressWS();

  return (
    <Flex direction="column" gap="3">
      <Button onClick={ping}>
        Połącz z backendem
      </Button>
      <Box
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: online ? "var(--green-9)" : "var(--red-9)",
        }}
      />
      {online === null && <Text>Jeszcze nie sprawdzono</Text>}
      {online === true && <Text style={{ color: "green" }}>Połączono</Text>}
      {online === false && <Text style={{ color: "red" }}>Brak połączenia</Text>}
       <Box p="4" width="300px">
      <Text>Postęp: {progress}%</Text>

      <Box
        mt="2"
        height="10px"
        style={{
          background: "var(--gray-4)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "var(--green-9)",
            transition: "width 0.1s linear",
          }}
        />
      </Box>

      {done && <Text mt="2">Zakończono!</Text>}
    </Box>
    </Flex>
  );
}
