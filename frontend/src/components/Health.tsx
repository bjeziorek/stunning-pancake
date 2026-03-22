import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useGatewayPing } from "../hooks/useGatewayPing";

export default function Health() {
 const { online, ping } = useGatewayPing();

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
    </Flex>
  );
}
