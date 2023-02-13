import {
  Text,
  Image,
  VStack,
  Button,
  HStack,
  Checkbox,
  Heading,
  useBoolean,
  Grid,
  GridItem,
  FormControl,
  useToast,
  IconButton,
  Stack,
  Box,
  Center,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getBlurImage } from "../api";
import GetBlurImage from "./GetBlurImage";
import GetBlurImageSkeleton from "./GetBlurImageSkeleton";
import { BiUndo } from "react-icons/bi";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

interface IChooseLabelProps {
  segImageUrl: string;
  labels: number[];
  onMoveReset: any;
}

interface ILabels {
  checkLabels: number[];
}

export default function ChooseLabel({
  segImageUrl,
  labels,
  onMoveReset,
}: IChooseLabelProps) {
  const labelStyles = {
    mt: "5",
    ml: "-2.5",
    fontSize: "sm",
  };

  const scrollRef = useRef<HTMLImageElement>(null);
  const onMoveElement = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };
  const [skeletonFlag, setSkeletonFlag] = useBoolean(true);

  const { register, watch } = useForm<ILabels>();
  const [strength, setStrength] = useState(30);
  const [blurSize, setblurSize] = useState(7);
  const [depthSplit, setdepthSplit] = useState(100);
  const [optionButton, setOptionButton] = useBoolean();
  const [next2, setNext2] = useState(false);
  const [blurImage, setBlurImage] = useState("");

  const toast = useToast();
  const getBlurMutation = useMutation(getBlurImage, {
    onSuccess: (data) => {
      toast({
        status: "success",
        title: "seg",
        position: "bottom-right",
      });
      setSkeletonFlag.off();
      setBlurImage(data.blured_file);
    },
  });

  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
    >
      <Grid templateColumns={"5fr 1fr"}>
        <GridItem>
          <Image rounded={"lg"} src={segImageUrl} />
        </GridItem>
        <GridItem>
          <VStack ml={20} spacing={5} align={"center"}>
            {labels?.map((label: number) => (
              <FormControl key={label}>
                <Checkbox size={"lg"} {...register(`checkLabels.${label}`)}>
                  {label}
                </Checkbox>
              </FormControl>
            ))}
          </VStack>
        </GridItem>
      </Grid>
      {optionButton ? (
        <VStack w={"100%"}>
          <Button colorScheme={"red"} onClick={setOptionButton.toggle}>
            Option
          </Button>
          <Center pt={6} pb={2} w={"70%"} alignItems={"center"} rounded={"3xl"}>
            <Text fontSize={20} mr={5}>
              Blur Strength
            </Text>
            <Slider
              min={10}
              w={"70%"}
              h={7}
              aria-label="slider-ex-6"
              onChange={(val) => setStrength(val)}
            >
              <SliderMark value={25} {...labelStyles}>
                25
              </SliderMark>
              <SliderMark value={50} {...labelStyles}>
                50
              </SliderMark>
              <SliderMark value={75} {...labelStyles}>
                75
              </SliderMark>
              <SliderMark
                value={strength}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {strength}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Center>

          <Center pt={6} pb={2} w={"70%"} alignItems={"center"} rounded={"3xl"}>
            <Text fontSize={20} mr={5}>
              Filter Size
            </Text>
            <Slider
              min={3}
              max={30}
              w={"70%"}
              h={7}
              aria-label="slider-ex-6"
              onChange={(val) => setblurSize(val)}
            >
              <SliderMark value={8} {...labelStyles}>
                8
              </SliderMark>
              <SliderMark value={16} {...labelStyles}>
                16
              </SliderMark>
              <SliderMark value={24} {...labelStyles}>
                24
              </SliderMark>
              <SliderMark
                value={blurSize}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {blurSize}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Center>

          <Center pt={6} pb={2} w={"70%"} alignItems={"center"} rounded={"3xl"}>
            <Text fontSize={20} mr={5}>
              quality
            </Text>
            <Slider
              min={100}
              max={200}
              w={"70%"}
              h={7}
              mb={10}
              aria-label="slider-ex-6"
              onChange={(val) => setdepthSplit(val)}
            >
              <SliderMark value={125} {...labelStyles}>
                125
              </SliderMark>
              <SliderMark value={150} {...labelStyles}>
                150
              </SliderMark>
              <SliderMark value={175} {...labelStyles}>
                175
              </SliderMark>
              <SliderMark
                value={depthSplit}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {depthSplit}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Center>

          <Button
            onClick={() => {
              setStrength(30);
              setblurSize(7);
              setdepthSplit(100);
            }}
          >
            Set Default
          </Button>
        </VStack>
      ) : (
        <Button colorScheme={"red"} onClick={setOptionButton.toggle}>
          Option
        </Button>
      )}

      <HStack spacing={20}>
        <Button
          fontSize={25}
          w={400}
          h={"14"}
          size={"lg"}
          colorScheme={"teal"}
          variant="solid"
          type="submit"
          onClick={() => {
            setNext2(true);
            onMoveElement();
            getBlurMutation.mutate({
              check_labels: watch(),
              seg_file: segImageUrl,
              strength: Number(strength) / 10,
              blur_size: blurSize,
              depth_split: depthSplit,
            });
          }}
        >
          Get Focusing Image
        </Button>
        <IconButton
          colorScheme={"red"}
          aria-label={"choose photo"}
          icon={<BiUndo size={"lg"} />}
          onClick={onMoveReset}
        />
      </HStack>
      {next2 ? (
        <VStack p={40}>
          <Heading textAlign={"center"} ref={scrollRef}>
            Blur Image
          </Heading>
          {skeletonFlag ? (
            <GetBlurImageSkeleton />
          ) : (
            <GetBlurImage blurImageURL={blurImage} onMoveReset={onMoveReset} />
          )}
        </VStack>
      ) : null}
    </VStack>
  );
}
