import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Box, Button, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";

export default function ExplainaionCarousel() {
  const { user } = useUser();
  const guideColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Box w={"60%"} bgColor={guideColor} justifyItems={"center"} rounded="xl">
      <Box p={5}></Box>
      <Carousel width="100%" infiniteLoop={true} showIndicators={false}>
        <Box>
          <Image
            boxSize="md"
            objectFit={"contain"}
            src="https://imagedelivery.net/QuZC_XPqQ0puEDGDCfsphg/b4f93a86-2a9c-4dbe-4434-396809d4e600/public"
          />
          <Text fontSize={20} fontStyle="italic" mt={10}>
            Select the image you want & Click Continue
          </Text>
          <Text fontSize={20} fontStyle="italic" mt={10}>
            If you want to get a good quality photo,
          </Text>
          <Text></Text>
        </Box>
        <Box>
          <Image
            gridColumn={"auto"}
            boxSize="md"
            objectFit="contain"
            src="https://imagedelivery.net/QuZC_XPqQ0puEDGDCfsphg/06ea834c-53c8-4987-d384-aaac6740e900/public"
          />
          <Text fontSize={20} fontStyle="italic" mt={10} mb={4}>
            You will get segmentation image & label
          </Text>
          <Text fontSize={20} fontStyle="italic">
            Choose label you want to get focus
          </Text>
          <Text fontSize={20} fontStyle="italic">
            Dont' Worry about missing label!
          </Text>
          <Text fontSize={20} fontStyle="italic">
            Our blur skill is not at all
          </Text>
        </Box>
        <Box>
          <Image
            gridColumn={"auto"}
            boxSize="md"
            objectFit="contain"
            src="https://imagedelivery.net/QuZC_XPqQ0puEDGDCfsphg/5a34623e-38a6-4b66-5006-a97b1d522600/public"
          />
          <Text fontSize={20} fontStyle="italic" mt={20} mb={4}>
            And the Option will help you
          </Text>
        </Box>

        <Box>
          <Image
            gridColumn={"auto"}
            boxSize="md"
            objectFit="contain"
            src="https://imagedelivery.net/QuZC_XPqQ0puEDGDCfsphg/26aaea90-32e7-4508-1f3d-4f7371736700/public"
          />
          <Text fontSize={20} fontStyle="italic" p={10}>
            Get Focus Image! Click Save!
          </Text>
          <Text fontSize={20} fontStyle="italic" mb={10}>
            But.. If you don't want this, Click 'Another Option'
          </Text>
          <Link to={`users/${user?.id}/photos`}>
            <Button
              p={10}
              fontSize={30}
              color="red.200"
              fontWeight={"semibold"}
            >
              Upload Image
            </Button>
          </Link>
          <Text color={"gray.500"} mt={5}>
            or Click your profile
          </Text>
        </Box>
      </Carousel>
    </Box>
  );
}
