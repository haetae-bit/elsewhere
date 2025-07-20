function detangle(tag: string) {
  const splitted = tag.split(/:|-/);
  switch (splitted[0]) {
    case "Tool":
    case "tool":
      const tool = splitted[1];
      return tool;
    case "Format":
    case "format":
      const format = splitted[1];
      return format;
    default:
      break;
  }
}