import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginForm } from '../login/LoginForm';

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center gap-4 h-32 mt-auto">
      <p className="font-p text-px12-500">@ 2023 1klog.dev</p>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="px-2 py-1 h-auto font-p text-px12-500">
            admin
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <LoginForm />
        </DialogContent>
      </Dialog>
    </footer>
  );
}
