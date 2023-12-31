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
import { LoginForm } from '@/components/login/LoginForm';
import LogoutButton from './LogoutButton';
import { getServerUser } from '@/util/getServerUser';

export default async function AuthButton() {
  const user = await getServerUser();

  return user ? (
    <LogoutButton />
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-2 py-1 h-auto font-p text-px12-500">
          admin
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogDescription>관리자만 로그인 할 수 있어요 😊</DialogDescription>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
