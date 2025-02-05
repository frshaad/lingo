import { useState } from 'react';

export function useHeartsModal() {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
}
