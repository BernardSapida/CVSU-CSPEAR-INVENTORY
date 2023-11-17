'use client';

import { FunctionComponent, useContext } from 'react';

import { trpc } from '@/lib/trpc/client';
import { Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';
import { AccountCard, AccountCardBody, AccountCardFooter } from "./AccountCard";
import { UserContext } from '@/store/UserContext';

interface CollegeCardProps {
  college: string;
}

const CollegeCard: FunctionComponent<CollegeCardProps> = ({ college }) => {
  const { user, setUser } = useContext(UserContext);
  const colleges: Record<string, string>[] = [
    { abbr: "UNKNOWN", value: "Choose your colleges" },
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
  const updateUserCollege = trpc.users.updateUserCollege.useMutation();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { college } = Object.fromEntries(form.entries()) as { college: College };

    updateUserCollege.mutate({ college });
    toast.success('You have successfully updated your colleges.');
    setUser({ ...user!, college });
  };

  if (!college) return;

  return (
    <AccountCard
      params={{
        header: "Colleges",
        description:
          "The colleges in the university belong to you.",
      }}
    >
      <AccountCardBody>
        <form onSubmit={handleSubmit} id='college-form'>
          <Select
            name='college'
            placeholder="Select your colleges"
            labelPlacement="outside"
            defaultSelectedKeys={[college]}
          >
            {
              colleges.map(({ abbr, value }) => (
                abbr === 'UNKNOWN' ?
                  <SelectItem key={abbr} value={abbr} textValue={`${value}`}>
                    {value}
                  </SelectItem> :
                  <SelectItem key={abbr} value={abbr} textValue={`${abbr} - ${value}`}>
                    {abbr} - {value}
                  </SelectItem>
              ))
            }
          </Select>
        </form>

      </AccountCardBody>
      <AccountCardFooter description="">
        <button
          type='submit'
          form='college-form'
          className={`bg-slate-900 py-2.5 px-3.5 rounded-md font-medium text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Update Colleges
        </button>
      </AccountCardFooter>
    </AccountCard>
  );
}

export default CollegeCard;