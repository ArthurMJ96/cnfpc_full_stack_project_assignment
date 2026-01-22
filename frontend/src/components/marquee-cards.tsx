
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { MessageSquareIcon } from 'lucide-react';
import { Button } from './ui/button';
import { TicketStatusBadge } from '@/features/ticket/components/ticket-status-badge';
import { UserAvatar } from '@/features/user/components/user-avatar';
import { getRelativeTime } from '@/lib/utils';
import type { TicketResponseDTO } from '@shared/dtos';
import { Badge } from './ui/badge';
import { Marquee } from './ui/marquee';
import { UserAvatarGroup } from '@/features/user/components/user-avatar-group';

const useFakeTickets = () => {
  const [tickets, setTickets] = useState<Partial<TicketResponseDTO>[]>([]);

  const getRandomAuthor = () => AUTHORS_POOL[Math.floor(Math.random() * AUTHORS_POOL.length)];

  const getRandomAssignees = (count: number) => {
    const shuffled = [...AUTHORS_POOL].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const generated = RAW_TICKET_CONTENT.map((t, i) => ({
      id: i + 1,
      title: t.title,
      description: t.description,
      commentCount: Math.floor(Math.random() * 12),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000)).toISOString(),
      author: getRandomAuthor(),
      status: t.status,
      assignedTo: getRandomAssignees(Math.floor(Math.random() * 7)),
    }) as unknown as Partial<TicketResponseDTO>);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTickets(generated);
  }, []);

  return { tickets }
};

export const MarqueeCards = () => {
  const { tickets } = useFakeTickets();
  const firstRow = tickets.slice(0, tickets.length / 2)
  const secondRow = tickets.slice(tickets.length / 2)
  const thirdRow = tickets.slice(3, (tickets.length / 2) + 4)
  const fourthRow = tickets.slice(tickets.length / 2)
  return (
    <div className="relative flex w-full h-screen flex-row items-center justify-center gap-4 overflow-hidden perspective-near">
      <div
        className="flex flex-row items-center gap-7"
        style={{
          transform:
            "translateX(-550px) translateY(0px) translateZ(-70px) rotateX(3deg) rotateY(-3deg) rotateZ(5deg)",
        }}
      >
        <Marquee reverse pauseOnHover vertical className="[--duration:35s]">
          {firstRow.map((t) => (
            <CardTicket ticket={t as TicketResponseDTO} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:35s]" vertical>
          {thirdRow.map((t) => (
            <CardTicket ticket={t as TicketResponseDTO} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:35s]" vertical>
          {secondRow.map((t) => (
            <CardTicket ticket={t as TicketResponseDTO} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:35s]" vertical>
          {fourthRow.map((t) => (
            <CardTicket ticket={t as TicketResponseDTO} />
          ))}
        </Marquee>
      </div>

      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-linear-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-linear-to-t"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  )
}


function CardTicket({ ticket }: { ticket: TicketResponseDTO }) {
  return (

    <Card size="sm" className="group min-w-md max-w-md">
      <CardHeader className="border-b bg-muted/5">
        <CardDescription className="flex gap-2 items-center *:text-[0.6rem]! -mt-1 relative align-text-top">
          <Badge variant="ghost"
            className="flex items-center gap-1 -ml-0.5 -mr-2 px-0.5 h-auto rounded-md group"
          >
            <UserAvatar
              size="sm"
              className="after:border-0 group-hover:after:border items-center align-middle *:text-[0.5rem]!"
              user={ticket.author!}
            />
            <div>

              <h3 className="font-semibold tracking-[-0.01em] text-xs">
                {ticket.author!.firstname} {ticket.author!.lastname}
              </h3>
              <span className="text-2xs align-bottom">{getRelativeTime(new Date(ticket.createdAt!).getTime())}{` • ${ticket.author!.jobTitle}`}</span>
            </div>
          </Badge>
        </CardDescription>

        <CardTitle className="line-clamp-1 mr-2 text-lg">
          {ticket.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-2 min-h-[2.5em] text-sm">
          {ticket.description}
        </p>
      </CardContent>

      <CardFooter className="border-t bg-muted/5 pt-3 mt-auto gap-4">
        <div className="flex items-center gap-3 w-full">
          <TicketStatusBadge ticket={ticket!} />
          <div className="flex items-center gap-1 text-muted-foreground ml-1">
            <Button variant="ghost" className="rounded-full">
              <MessageSquareIcon className="size-3.5" />
              <span className="text-xs">{ticket.commentCount}</span>
            </Button>
          </div>
        </div>

        {/* Assignees Menu */}
        <UserAvatarGroup users={ticket.assignedTo || []} />
      </CardFooter>
    </Card>
  );
}




const AUTHORS_POOL = [
  { firstname: "Marcus", lastname: "Holloway", jobTitle: "SRE Engineer" },
  { firstname: "Sarah", lastname: "Jenkins", jobTitle: "Technical Writer" },
  { firstname: "Chen", lastname: "Wei", jobTitle: "Frontend Lead" },
  { firstname: "Elena", lastname: "Rodriguez", jobTitle: "Backend Dev" },
  { firstname: "James", lastname: "Wilson", jobTitle: "Product Designer" },
  { firstname: "Alex", lastname: "Chen", jobTitle: "Security Analyst" },
  { firstname: "Chloe", lastname: "Dubois", jobTitle: "Support Specialist" },
  { firstname: "Liam", lastname: "Smith", jobTitle: "DBA" },
  { firstname: "Maya", lastname: "Patel", jobTitle: "UI Engineer" },
  { firstname: "Nico", lastname: "Visser", jobTitle: "Platform Engineer" },
  { firstname: "Linda", lastname: "Garcia", jobTitle: "Database Admin" },
  { firstname: "Tom", lastname: "Baker", jobTitle: "Backend Dev" },
  { firstname: "Kevin", lastname: "Vought", jobTitle: "Content Strategist" },
  { firstname: "Sam", lastname: "Jordan", jobTitle: "QA Analyst" },
  { firstname: "Jean", lastname: "Pierre", jobTitle: "Translator" },
  { firstname: "Aisha", lastname: "Khan", jobTitle: "DevOps Lead" }
];


const RAW_TICKET_CONTENT = [
  {
    title: "Database connection timeout in prod-us-east",
    description: "Multiple services reporting high latency and socket hang-ups when connecting to the primary RDS instance. Initial logs suggest a spike in active connections.",
    status: "IN_PROGRESS" as const
  },
  {
    title: "Broken link in documentation footer",
    description: "The 'API Reference' link in the developer portal footer is currently pointing to a non-existent staging URL (404 error). Needs immediate redirection.",
    status: "OPEN" as const
  },
  {
    title: "Memory leak in dashboard live-polling",
    description: "Heap snapshots show a steady increase in memory usage when the dashboard is left open for more than 2 hours. Appears to be related to the websocket event listeners.",
    status: "RESOLVED" as const
  },
  {
    title: "Stripe webhook 500 error on trial events",
    description: "Payment gateway is failing to process 'customer.subscription.trial_will_end' events. The signature verification seems to be failing intermittently.",
    status: "OPEN" as const
  },
  {
    title: "Implement dark mode persistence",
    description: "Requested by several enterprise users. We need to store the theme preference in local storage and sync it with the user profile database for multi-device support.",
    status: "IN_PROGRESS" as const
  },
  {
    title: "Vulnerability detected in 'lodash' dependency",
    description: "Automated scan flagged a prototype pollution vulnerability in version 4.17.20. Need to upgrade to the latest stable release across all microservices.",
    status: "CLOSED" as const
  },
  {
    title: "French translation missing in billing",
    description: "Several i18n keys for the 'Invoice History' section are currently falling back to English. Need to verify with the localization team and update locales/fr.json.",
    status: "OPEN" as const
  },
  {
    title: "Slow query on user search by email",
    description: "Execution plan shows a full table scan instead of using the indexed column. Need to rebuild the index or optimize the Sequelize query structure.",
    status: "IN_PROGRESS" as const
  },
  {
    title: "SVG icons not rendering in Firefox legacy",
    description: "Compatibility issue with the new icon sprite sheet in Firefox versions earlier than 90. Need to implement a fallback or polyfill for better cross-browser support.",
    status: "RESOLVED" as const
  },
  {
    title: "Email notification delay in EMEA",
    description: "SMTP relay latency in our European cluster is causing a 5-10 minute delay in transactional emails. Investigating the regional mail server health.",
    status: "OPEN" as const
  }
];