import ClinicForm from "@/app/clinic-form/components/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ClinicFormPage = () => {
  return (
    <div>
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar clínica</DialogTitle>
            <DialogDescription>
              Adicione uma clínica para continuar.
            </DialogDescription>
          </DialogHeader>
          <ClinicForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClinicFormPage;
