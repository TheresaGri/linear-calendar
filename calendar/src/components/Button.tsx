type buttonProps = {
  onPress: React.MouseEventHandler<HTMLButtonElement> ;
  children: React.ReactNode;

}

export default function Button({onPress, children }: buttonProps) {
  return(
  <button onClick = {onPress}>{children}</button>);
}