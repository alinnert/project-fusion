import { get } from 'idb-keyval';
import { useEffect } from 'react';
import { useAppDispatch } from '../redux';
import { openDatabaseFielWithHandle } from '../redux/database/openDatabaseFileWithHandle';
import { asyncTry } from '../utils/tryCatch';

export function usePersistedFileHandle() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function run() {
      console.log('hi from wrapped app');
      const fileHandleResult = await asyncTry(() => get<FileSystemFileHandle>('fileHandle')
      );
      if (fileHandleResult.caught)
        return;
      if (fileHandleResult.value === undefined)
        return;
      const fileHandle = fileHandleResult.value;
      openDatabaseFielWithHandle(fileHandle);
    }

    run();
  }, [dispatch]);
}
