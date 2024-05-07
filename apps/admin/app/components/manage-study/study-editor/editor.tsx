import MDEditor from "@uiw/react-md-editor";
import { Dispatch, SetStateAction } from "react";

export default function Editor({
  value,
  setValue,
}: {
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
}) {
  return <MDEditor value={value} onChange={setValue} />;
}
