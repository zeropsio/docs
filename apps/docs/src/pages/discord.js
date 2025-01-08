import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function RedirectToDiscord() {
  const history = useHistory();

  useEffect(() => {
    window.location.href = 'https://discord.gg/3yZknaRhxK';
  }, [history]);

  return null;
}
