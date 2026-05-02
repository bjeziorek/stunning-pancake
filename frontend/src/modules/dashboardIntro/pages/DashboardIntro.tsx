import { useGatewayPing } from "@/app/hooks/useGatewayPing";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";


export default function DashboardIntro() {

    const { online: isApiGatewayOnline, servicesList } = useGatewayPing();

    if (!isApiGatewayOnline) {
        return (<div>Here will be demo content (no i18n!)</div>)
    } else {
        console.log(servicesList)
    }

    return (
        <Flex>
            <ul>
                {servicesList.map(service => (
                    <li>{service.name} - {service.status} - <Button variant="ghost" mx="1">On/Off</Button> | <Button variant="ghost">Preview</Button></li>
                ))}
            </ul>
            <Box m="4">
                <Card>
                    <Text>Tu będzie wpisane preview (no i18n!)</Text>
                </Card>
            </Box>
        </Flex>
    )
}