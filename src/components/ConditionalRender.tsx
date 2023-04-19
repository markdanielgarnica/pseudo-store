function ConditionalRender({ condition, renderIf, renderElse = null }: any) {
  return condition ? renderIf : renderElse;
}

export default ConditionalRender;
