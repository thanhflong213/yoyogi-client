import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/libs/react-query';
import { AppRouter } from '@/router';
import '@/i18n';
import './index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
