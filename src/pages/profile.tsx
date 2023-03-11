import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton, Stack, Text } from "@chakra-ui/react";

const ProfilePage = () => {
  return (
    <Stack>
      <IconButton
        aria-label="Back to home"
        icon={<ArrowBackIcon />}
        onClick={() => {
          window.history.back();
        }}
      />
      <Stack>
        <Text>Halaman Profil</Text>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
