import { Image, VStack, Button, HStack } from "@chakra-ui/react";
import { saveAs } from "file-saver";

interface IGetBlurImageProps {
  blurImageURL: string;
  onMoveResubmit: any;
}

export default function GetBlurImage({
  blurImageURL,
  onMoveResubmit,
}: IGetBlurImageProps) {
  const handleClick = () => {
    let url = blurImageURL;
    saveAs(url, "Blur-Image");
  };
  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
      p={10}
    >
      <Image rounded={"lg"} src={blurImageURL} />
      <HStack spacing={20}>
        <Button
          fontSize={20}
          w={200}
          h={"14"}
          size={"lg"}
          colorScheme={"teal"}
          variant="solid"
          type="button"
          onClick={handleClick}
        >
          Save
        </Button>
        <Button
          fontSize={20}
          w={200}
          h={"14"}
          size={"lg"}
          colorScheme={"teal"}
          variant="solid"
          type="submit"
          onClick={onMoveResubmit}
        >
          Another Option
        </Button>
      </HStack>
    </VStack>
  );
}
