import { ArrowForwardIcon, ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
import { api } from "~/utils/api";

export default function Home() {
  const data = api.example.welcome.useQuery();

  const [listName, setListName] = useState<string[]>([]);

  const [inputName, setInputName] = useState<string>("");

  if (!data.data) {
    return (
      <>
        <p
          style={{
            color: "black",
          }}
        >
          plan html loading
        </p>
        <p>{JSON.stringify(data)}</p>
        <Center>
          <Box>Loading...</Box>
        </Center>
      </>
    );
  }

  const handleOnSubmit = () => {
    setListName([...listName, inputName]);
    setInputName("");
  };

  return (
    <>
      <p
        style={{
          color: "black",
        }}
      >
        plan html success
      </p>
      <p>{JSON.stringify(data)}</p>
      <Center pt="4">
        <Stack>
          <Heading>{data.data.greeting}</Heading>
          <Stack
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
          >
            <FormControl>
              <Input
                maxW="xs"
                placeholder="Masukkan nama"
                onChange={(e) => {
                  setInputName(e.target.value);
                }}
                value={inputName}
              />
            </FormControl>
            <Button type="submit" colorScheme="green">
              Tambah
            </Button>
          </Stack>

          <Stack pt="4">
            <Heading as="h2" fontSize="xl" color="blackAlpha.900">
              Daftar Nama
            </Heading>
            {listName.map((name, index) => (
              <HStack key={index} bg="gray.200" py="2" px="3" rounded="md">
                <Text>{name}</Text>
                <Spacer />
                <Link href={`/profile`}>
                  <Tooltip label="Lihat Detail" aria-label="Lihat Detail">
                    <IconButton
                      aria-label="Details"
                      icon={<ArrowForwardIcon />}
                      variant="ghost"
                      colorScheme="blue"
                    />
                  </Tooltip>
                </Link>
                <Tooltip label="Hapus" aria-label="Hapus">
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => {
                      const newListName = listName.filter(
                        (_, i) => i !== index,
                      );
                      setListName(newListName);
                    }}
                  />
                </Tooltip>
              </HStack>
            ))}
          </Stack>
        </Stack>
      </Center>
    </>
  );
}
