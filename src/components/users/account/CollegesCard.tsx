'use client';

import { FunctionComponent, useTransition } from 'react';

import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CollegeCardProps {
  college: string;
}

const CollegeCard: FunctionComponent<CollegeCardProps> = ({ college }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const colleges: Record<string, string>[] = [
    { abbr: "CAFENR", value: "College of Agriculture, Food, Environment and Natural Resources" },
    { abbr: "CAS", value: "College of Arts and Science" },
    { abbr: "CCJ", value: "College of Criminal Justice" },
    { abbr: "CED", value: "College of Education" },
    { abbr: "CEMDS", value: "College of Economics, Management and Development Studies" },
    { abbr: "CEIT", value: "College of Engineering and Information Technology" },
    { abbr: "CON", value: "College of Nursing" },
    { abbr: "CSPEAR", value: "College of Sports, Physical Education and Recreation" },
    { abbr: "CVMBS", value: "College of Veterinary Medicine and Biomedical Sciences" },
    { abbr: "COM", value: "College of Medicine" },
  ];

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { name } = Object.fromEntries(form.entries()) as { name: string };

    startTransition(async () => {
      const res = await fetch("/api/account", {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) alert("Successfully updated name!");
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: "Colleges",
        description:
          "The colleges in the university belong to you.",
      }}
    >
      <AccountCardBody>
        <Select
          placeholder="Select your colleges"
          labelPlacement="outside"
          defaultSelectedKeys={[college]}
        >
          {
            colleges.map(({ abbr, value }) => (
              <SelectItem key={abbr} value={abbr} textValue={`${abbr} - ${value}`}>
                {abbr} - {value}
              </SelectItem>
            ))
          }
        </Select>
      </AccountCardBody>
      <AccountCardFooter description="">
        <button
          className={`bg-slate-900 py-2.5 px-3.5 rounded-md font-medium text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => toast.success('Colleges has been updated')}
        // disabled={true}
        >
          Update Colleges
        </button>
      </AccountCardFooter>
    </AccountCard>
  );
}

export default CollegeCard;