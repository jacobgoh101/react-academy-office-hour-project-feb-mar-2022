import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { DashboardLayout } from '../components/layouts/dashboard';
import { RouterLink } from '../components/router-link';

export default function NotFoundPage() {
  return (
    <DashboardLayout>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, blue.400, blue.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
          The page you're looking for does not seem to exist
        </Text>

        <RouterLink href="/">
          <Button
            colorScheme="blue"
            bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
            color="white"
            variant="solid"
          >
            Go to Home
          </Button>
        </RouterLink>
      </Box>
    </DashboardLayout>
  );
}
