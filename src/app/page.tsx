import { DarkMode } from "@/components/custom/dark-mode";
import GetStartedButton from "@/components/custom/get-started-button";
import MagicLinkForm from "@/components/custom/magic-link-form";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex justify-center gap-8 flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Sistema de Autenticación
          <span className="block text-primary dark:text-emerald-400 text-center">
            Ejemplo Completo
          </span>
        </h1>
        <p className="text-md text-center text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          Un ejemplo funcional de sistema de autenticación que construí. Prueba
          todas las funcionalidades o revisa el código.
        </p>
        <MagicLinkForm />
        <div className="flex flex-col items-center gap-3 justify-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GetStartedButton />
          </div>
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Page;
