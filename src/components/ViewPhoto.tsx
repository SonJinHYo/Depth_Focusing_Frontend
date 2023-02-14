import {
  Image,
  VStack,
  Button,
  Heading,
  useToast,
  useBoolean,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { getSegmentation } from "../api";
import ChooseLabel from "./ChooseLabel";
import ChooseLabelSkeleton from "./ChooseLabelSkeleton";

interface IViewPhotosProps {
  imageUrl: string;
}

export default function ViewPhoto({ imageUrl }: IViewPhotosProps) {
  const scrollReset = useRef<any>(null);
  const onMoveReset = () => {
    scrollReset.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };
  const scrollRef = useRef<any>(null);
  const onMoveElement = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const [skeletonFlag, setSkeletonFlag] = useBoolean(true);
  const [next, setNext] = useState(false);
  const [segImg, setSegImg] = useState("");
  // 많은 태그가 나오는 경우 해결 X
  const [labels, setLabels] = useState<number[]>([]);
  const toast = useToast();
  // 백엔드 구현 후 완료될 부분
  const getSegmentatedImage = useMutation(getSegmentation, {
    onSuccess: (data: any) => {
      toast({
        status: "success",
        title: "Complete!",
        position: "bottom-right",
        isClosable: true,
      });
      setNext(true);
      const arr = Array.from({ length: data.labels_len }, (v, i) => i + 1);
      setLabels(arr);
      setSegImg(data.seg_file);
      setSkeletonFlag.off();
    },
  });

  return (
    <VStack
      my="10"
      align={"center"}
      justifyContent={"space-between"}
      spacing="10"
      ref={scrollReset}
    >
      <Heading textAlign={"center"}>Selected Image</Heading>
      <Image rounded={"lg"} src={imageUrl} />
      <Button
        fontSize={25}
        w={400}
        h={"14"}
        size={"lg"}
        colorScheme={"teal"}
        variant="solid"
        onClick={() => {
          setNext(true);
          // 백엔드 구현 후 활성화될 부분
          getSegmentatedImage.mutate({ file: imageUrl });
          onMoveElement();
        }}
      >
        Continue
      </Button>

      {next ? (
        <VStack
          my="10"
          align={"center"}
          justifyContent={"space-between"}
          spacing="10"
          p={20}
        >
          <Heading textAlign={"center"} ref={scrollRef}>
            Selected label
          </Heading>
          {skeletonFlag ? (
            <ChooseLabelSkeleton />
          ) : (
            <ChooseLabel
              segImageUrl={segImg}
              labels={labels}
              onMoveReset={onMoveReset}
            />
          )}
        </VStack>
      ) : null}
    </VStack>
  );
}
