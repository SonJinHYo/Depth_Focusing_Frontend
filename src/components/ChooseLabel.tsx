import {
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
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getBlurImage } from "../api";
import GetBlurImage from "./GetBlurImage";
import GetBlurImageSkeleton from "./GetBlurImageSkeleton";
import { BiUndo } from "react-icons/bi";
import { off } from "process";

interface IChooseLabelProps {
  segImageUrl: string;
  labels: number[];
  onMoveReset: any;
}

interface ILabels {
  check_labels: number[];
}

export default function ChooseLabel({
  segImageUrl,
  labels,
  onMoveReset,
}: IChooseLabelProps) {
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

  const { register, handleSubmit, watch } = useForm<ILabels>();
  const [next, setNext] = useState(false);
  const [blurImage, setBlurImage] = useState("");

  const toast = useToast();
  const getBlurMutation = useMutation(getBlurImage, {
    onSuccess: (data) => {
      toast({
        status: "success",
        title: "seg",
        position: "bottom-right",
      });
      setNext(true);
      setSkeletonFlag.off();
      // blur 함수 완성되면
      // setBlurImage(data.blur_file);
      // 임시
      setBlurImage(data.seg_file);
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
                <Checkbox size={"lg"} {...register(`check_labels.${label}`)}>
                  {label}
                </Checkbox>
              </FormControl>
            ))}
          </VStack>
        </GridItem>
      </Grid>
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
            onMoveElement();
            getBlurMutation.mutate({
              check_labels: watch(),
              seg_file: segImageUrl,
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
      {next ? (
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
