#!/bin/bash
cd /home/kavia/workspace/code-generation/note-management-system-10493-10502/frontend_notes_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

