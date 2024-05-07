"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Study, Tag } from "@repo/types/src/study";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateStudy } from "../../../actions/update-study.server";

const items = {
  "spring boot": "green",
  java: "rose",
  c: "black",
  "c++": "grey",
  "node.js": "pink",
  "next.js": "pyo",
} as Tag;

const FormSchema = z.object({
  items: z.record(z.string()).refine((value) => Object.keys(value).length > 0, {
    message: "You have to select at least one item.",
  }),
});

export function AddTagFormDialog({ study }: { study: Study }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: study.tags,
    },
  });

  async function onSubmit(tags: z.infer<typeof FormSchema>) {
    const updatedStudy = study;
    updatedStudy.tags = tags.items;
    const { data, error } = await updateStudy({ study: updatedStudy });
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>수정</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>태그 추가하기</DialogTitle>
          <DialogDescription>
            아래 정의된 태그 중 추가할 태그를 선택해주세요. 완료 후 수정 버튼을
            눌러주세요.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem className="grid sm:grid-cols-3 grid-cols-2">
                  {Object.entries(items).map(([tag, color]) => (
                    <FormField
                      key={`${tag}-${color}`}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={tag}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={tag in field.value}
                                onCheckedChange={(checked) => {
                                  const updatedValue = { ...field.value };

                                  if (checked) {
                                    updatedValue[tag] = color; // Assigning true when the checkbox is checked
                                  } else {
                                    delete updatedValue[tag];
                                  }

                                  // Update the data object with the updated tags
                                  const updatedStudy = {
                                    ...study,
                                    tags: updatedValue,
                                  };

                                  // Update the form value with the updated data
                                  form.setValue("items", updatedStudy.tags);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{tag}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={() => onSubmit(form.getValues())}>수정</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
