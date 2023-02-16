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
  Center,
  Box,
  useDisclosure,
  Collapse,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getBlurImage, retryBlurImage } from "../api";
import GetBlurImage from "./GetBlurImage";
import GetBlurImageSkeleton from "./GetBlurImageSkeleton";
import { BiUndo } from "react-icons/bi";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
} from "@chakra-ui/react";

interface IChooseLabelProps {
  segImageUrl: string;
  labels: number[];
  onMoveReset: any;
}

interface ILabels {
  check_label: number;
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
  const scrollRetry = useRef<HTMLButtonElement>(null);
  const onMoveRetry = () => {
    setTimeout(() => {
      scrollRetry.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const { isOpen, onToggle } = useDisclosure();
  const [skeletonFlag, setSkeletonFlag] = useBoolean(true);
  const [retryButton, setRetryButton] = useBoolean();

  const { register, watch } = useForm<ILabels>();
  const [strength, setStrength] = useState(30);
  const [blurSize, setblurSize] = useState(4);
  const [depthSplit, setdepthSplit] = useState(100);
  const [next2, setNext2] = useState(false);
  const [blurImage, setBlurImage] = useState("");

  const toast = useToast();
  const getBlurMutation = useMutation(getBlurImage, {
    onSuccess: (data) => {
      toast({
        status: "success",
        title: "Complete!",
        position: "bottom-right",
      });
      setSkeletonFlag.off();
      setBlurImage(data.blured_file);
    },
  });

  const retryBlurMutation = useMutation(retryBlurImage, {
    onSuccess: (data) => {
      toast({
        status: "success",
        title: "Complete!",
        position: "bottom-right",
      });
      setSkeletonFlag.off();
      setBlurImage(data.blured_file);
    },
  });
  console.log(watch());

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
          <VStack ml={20} spacing={5}>
            <FormControl>
              <FormLabel as="legend">Labels</FormLabel>
              <RadioGroup defaultValue="1">
                <VStack spacing="24px">
                  {labels?.map((label: number) => (
                    <Radio
                      key={label}
                      value={String(label)}
                      {...register(`check_label`)}
                    >
                      {label}
                    </Radio>
                  ))}
                  {/* <Checkbox size={"lg"} {...register(`check_labels.${label}`)}>
                {label}
              </Checkbox> */}
                </VStack>
              </RadioGroup>
              {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
            </FormControl>
          </VStack>
        </GridItem>
      </Grid>
      <VStack w={"100%"}>
        <Button
          colorScheme={"red"}
          onClick={onToggle}
          mb={10}
          ref={scrollRetry}
        >
          Option
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <VStack w={800} bgColor={"gray.900"} p={10} rounded={"xl"}>
            <Center
              pt={6}
              pb={2}
              w={"70%"}
              alignItems={"center"}
              rounded={"3xl"}
            >
              <Text color={"whiteAlpha.900"} fontSize={20} mr={5}>
                Blur Strength
              </Text>
              <Slider
                defaultValue={30}
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

            <Center
              pt={6}
              pb={2}
              w={"70%"}
              alignItems={"center"}
              rounded={"3xl"}
            >
              <Text color={"whiteAlpha.900"} fontSize={20} mr={5}>
                Filter Size
              </Text>
              <Slider
                defaultValue={4}
                min={1}
                max={8}
                w={"70%"}
                h={7}
                aria-label="slider-ex-6"
                onChange={(val) => setblurSize(val)}
              >
                <SliderMark value={2} {...labelStyles}>
                  2
                </SliderMark>
                <SliderMark value={4} {...labelStyles}>
                  4
                </SliderMark>
                <SliderMark value={6} {...labelStyles}>
                  6
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

            <Center
              pt={6}
              pb={2}
              w={"70%"}
              alignItems={"center"}
              rounded={"3xl"}
            >
              <Text color={"whiteAlpha.900"} fontSize={20} mr={5}>
                quality
              </Text>
              <Slider
                defaultValue={100}
                min={50}
                max={150}
                w={"70%"}
                h={7}
                // mb={10}
                aria-label="slider-ex-6"
                onChange={(val) => setdepthSplit(val)}
              >
                <SliderMark value={75} {...labelStyles}>
                  75
                </SliderMark>
                <SliderMark value={100} {...labelStyles}>
                  100
                </SliderMark>
                <SliderMark value={125} {...labelStyles}>
                  125
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
            <Box p={5}></Box>

            <Button
              colorScheme={"facebook"}
              onClick={() => {
                setStrength(30);
                setblurSize(4);
                setdepthSplit(100);
              }}
            >
              Set Default
            </Button>
          </VStack>
        </Collapse>
      </VStack>
      <HStack spacing={20}>
        {retryButton ? (
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
              retryBlurMutation.mutate({
                check_label: Number(watch("check_label")),
                seg_file: segImageUrl,
                strength: Number(strength) / 10,
                blur_size: blurSize,
                depth_split: depthSplit,
              });
              setSkeletonFlag.on();
            }}
          >
            Retry
          </Button>
        ) : (
          <Button
            fontSize={25}
            w={400}
            h={"14"}
            size={"lg"}
            colorScheme={"teal"}
            variant="solid"
            type="submit"
            onClick={() => {
              setSkeletonFlag.on();
              setNext2(true);
              onMoveElement();
              getBlurMutation.mutate({
                check_label: Number(watch("check_label")),
                seg_file: segImageUrl,
                strength: Number(strength) / 10,
                blur_size: blurSize,
                depth_split: depthSplit,
              });
              setRetryButton.on();
            }}
          >
            Get Focusing Image
          </Button>
        )}

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
            <GetBlurImage
              blurImageURL={blurImage}
              onMoveResubmit={onMoveRetry}
            />
          )}
        </VStack>
      ) : null}
    </VStack>
  );
}
