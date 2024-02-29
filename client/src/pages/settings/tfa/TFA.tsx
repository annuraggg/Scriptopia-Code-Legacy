import { Navbar } from "@/components/ui/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import QRCode from "qrcode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";

const TFA = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [defaultEnabled, setDefaultEnabled] = useState<boolean>(false);
  const [enableLoading, setEnableLoading] = useState<boolean>(true);
  const [secret, setSecret] = useState<string>("");
  const [qr, setQr] = useState<string>("");
  const [totp, setTotp] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogLoading, setDialogLoading] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [recoverCodes, setRecoverCodes] = useState<string[]>([]);

  const toggleEnabled = (c: boolean) => {
    if (!enabled) {
      setEnabled(c);
      generateCode();
    } else setConfirmOpen(true);
  };

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/settings/tfa/status`)
      .then((res) => {
        setDefaultEnabled(res.data.enabled);
        setEnabled(res.data.enabled);
        setRecoverCodes(res.data.recoveryCodes);
        console.log(res.data.recoveryCodes);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching settings");
      });
  }, []);

  const generateCode = () => {
    setEnableLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/settings/tfa`, {
        enabled,
      })
      .then((res) => {
        setSecret(res.data.secret);
        QRCode.toDataURL(res.data.code)
          .then((url: any) => {
            setQr(url);
          })
          .catch((err: any) => {
            console.log(err);
            toast.error("Error generating QR code");
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error generating code");
      })
      .finally(() => {
        setEnableLoading(false);
      });
  };

  const copyText = () => {
    navigator.clipboard.writeText(secret);
    toast.success("Copied to clipboard");
  };

  const verify = () => {
    setDialogLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/settings/tfa/verify`, {
        totp,
        secret,
      })
      .then((res) => {
        setDialogOpen(false);
        setEnabled(true);
        setDefaultEnabled(true);
        setRecoverCodes(res.data.recoveryCodes);
        toast.success("Two Factor Authentication Enabled");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("Invalid TOTP");
          return;
        }
        console.log(err);
        toast.error("Error enabling Two Factor Authentication");
      })
      .finally(() => {
        setDialogLoading(false);
      });
  };

  const disableTfa = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/settings/tfa/disable`)
      .then(() => {
        setConfirmOpen(false);
        setEnabled(false);
        setDefaultEnabled(false);
        toast.success("Two Factor Authentication Disabled");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error disabling Two Factor Authentication");
      });
  };

  return (
    <>
      <Navbar />
      <IoMdArrowBack
        className="text-2xl mt-5 cursor-pointer ml-10"
        onClick={() => history.back()}
      />
      <div className="container mx-auto flex justify-center flex-col items-center">
        <h1 className="text-3xl font-bold">Two Factor Authentication</h1>
        <p className="mt-5 text-center">
          Two factor authentication is a method of confirming a user's claimed
          identity by utilizing a combination of two different components. 2FA
          is a type of multi-factor authentication.
        </p>

        <div className="border py-5 px-5 mt-5 rounded flex items-center justify-between w-2/5">
          <h5>Enable Two Factor Authentication</h5>
          <Switch checked={enabled} onCheckedChange={(c) => toggleEnabled(c)} />
        </div>

        {enabled && !defaultEnabled && (
          <div className="flex flex-col items-center justify-center">
            <p className="mt-5 text-center">
              Scan the QR code with your authenticator app
            </p>
            {enableLoading ? (
              <>
                <Skeleton className="w-[200px] h-[200px] mt-5 rounded-md" />
              </>
            ) : (
              <>
                <img src={qr} alt="QR Code" className="mt-5" />
                <p className="mt-5">Or enter the code manually</p>
                <p className=" bg-secondary py-1 px-5 rounded-sm mt-2 flex items-center justify-between gap-5">
                  {secret}
                  <FiCopy className="cursor-pointer" onClick={copyText} />
                </p>

                <Button
                  className="bg-primary text-white w-full p-2 px-5 rounded-md mt-5"
                  onClick={() => setDialogOpen(true)}
                >
                  Next <MdNavigateNext className="mt-0.5 ml-0.5" size={18} />
                </Button>

                <Dialog open={dialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Enter the Code show in your Authentication App
                      </DialogTitle>
                      <DialogDescription>
                        <Input
                          placeholder="123456"
                          className="mt-5"
                          type="number"
                          value={totp}
                          onChange={(e) => setTotp(e.target.value)}
                        />
                        <DialogClose asChild>
                          <Button
                            onClick={verify}
                            className="bg-primary text-white w-full p-2 px-5 rounded-md mt-5"
                            disabled={dialogLoading}
                          >
                            {dialogLoading ? (
                              <ReloadIcon className="mt-0.5 ml-0.5 h-4 w-4" />
                            ) : (
                              "Enable"
                            )}
                          </Button>
                        </DialogClose>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        )}

        {enabled && defaultEnabled && (
          <div className="mt-5">
            <>
              <div className="flex flex-col items-center justify-center">
                <h5>Recovery Codes</h5>
                <p className="mt-5 text-center">
                  Save these codes in a safe place. You can use these codes to
                  access your account if you lose access to your authenticator
                  app.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 w-2/5 mx-auto">
                {recoverCodes.map((code: any, i) => (
                  <p
                    key={i}
                    className="text-center bg-secondary py-1 px-5 rounded-sm mt-2 flex items-center justify-center gap-5"
                  >
                    {code.code}
                  </p>
                ))}
              </div>
            </>
          </div>
        )}

        <AlertDialog open={confirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Disabling 2FA will make your account less secure
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={disableTfa}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default TFA;
