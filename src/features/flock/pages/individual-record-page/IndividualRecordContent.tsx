import type { Cow } from "../../types/cow.types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditCowModal } from "../../components/modals/individual-modal/EditCowModal";
import { InactiveCowModal } from "../../components/modals/individual-modal/InactiveCow";
import { EditWeightModal } from "../../components/modals/individual-modal/EditWeightModal";
import { useInactivateCow } from "../../hooks/useInactivateCow";
import { IndividualRecordMainSection } from "./components/IndividualRecordMainSection";
import { IndividualRecordHeader } from "./components/IndividualRecordHeader";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb/Breadcrumb";
import { IndividualRecordAlert } from "./components/IndividualRecordAlert";

interface IndividualRecordContentProps {
  cow: Cow;
}

export function IndividualRecordContent({ cow }: IndividualRecordContentProps) {
  const navigate = useNavigate();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openInactiveModal, setOpenInactiveModal] = useState(false);
  const [openWeightModal, setOpenWeightModal] = useState(false);

  const { mutateAsync: inactivateCow, isPending: isInactivating } =
    useInactivateCow();

  return (
    <main className="flex flex-col gap-6 p-4 w-full">
      <IndividualRecordAlert cow={cow} />

      <Breadcrumb
        items={[
          {
            label: "Rebanho",
            onClick: () => navigate("/flock"),
          },
          {
            label: cow.name,
          },
        ]}
      />

      <IndividualRecordHeader
        cow={cow}
        onEdit={() => setOpenEditModal(true)}
        onInactive={() => setOpenInactiveModal(true)}
      />

      <IndividualRecordMainSection
        cow={cow}
        onRegisterWeight={() => setOpenWeightModal(true)}
      />

      <EditCowModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        cowId={cow.id}
        initialData={{
          name: cow.name,
          code: cow.ear_tag,
          birthDate: cow.birth_date,
          breed: cow.breed,
        }}
      />
      <InactiveCowModal
        open={openInactiveModal}
        onClose={() => setOpenInactiveModal(false)}
        isLoading={isInactivating}
        onConfirm={async (data) => {
          await inactivateCow({
            id: cow.id,
            data,
          });
        }}
      />
      <EditWeightModal
        open={openWeightModal}
        onClose={() => setOpenWeightModal(false)}
        cowId={cow.id}
      />
    </main>
  );
}
