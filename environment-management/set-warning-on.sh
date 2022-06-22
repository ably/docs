SHELL_NAME=$(basename $SHELL)

if [[ "$SHELL_NAME" == "zsh" ]]
then
  CONFIG_FILE="$HOME/.zshrc"
else
  CONFIG_FILE="$HOME/.bash_profile"
fi

if [ -e "$CONFIG_FILE" ]; then
  if [ -f "$CONFIG_FILE" ]; then
    grep -v 'unset EDITOR_WARNINGS_OFF' $CONFIG_FILE > "$CONFIG_FILE.tmp";
    grep -v 'export EDITOR_WARNINGS_OFF="true"' "$CONFIG_FILE.tmp" > "$CONFIG_FILE.tmp2"; mv "$CONFIG_FILE.tmp2" $CONFIG_FILE
    LINE='unset EDITOR_WARNINGS_OFF'
    grep -xqF -- "$LINE" "$CONFIG_FILE" || echo "$LINE" >> "$CONFIG_FILE"
    unset EDITOR_WARNINGS_OFF
    echo 'Editor warnings switched on'
  else
    echo "$CONFIG_FILE is not a file, exiting - make sure your $SHELL_NAME configuration is set up correctly"
    exit 1;
  fi
else
  echo "$CONFIG_FILE does not exist, exiting - make sure your $SHELL_NAME configuration is set up"
  exit 1;
fi