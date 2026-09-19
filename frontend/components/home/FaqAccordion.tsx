"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/content/SectionHeading";

interface Faq {
  question: string;
  answer: string;
}

const FAQS: Faq[] = [
  {
    question: "How long does implementation take?",
    answer:
      "Most standard setups take 5 to 12 working days depending on branch count, data migration, devices, and approval timelines."
  },
  {
    question: "Can outlets work if internet drops?",
    answer:
      "Yes. We can plan hybrid local operation and sync flows so key outlet functions continue during temporary connectivity issues."
  },
  {
    question: "Do you support M-Pesa?",
    answer:
      "Yes. We support M-Pesa-ready payment workflows and can advise on the correct integration path for your business."
  }
];

// Recreates main.js's single-open FAQ accordion (opening one closes any other open item)
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="FAQ" heading="Common questions" />
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-lg border border-daltar-border bg-daltar-bg-deep"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-semibold text-daltar-text-bright"
                >
                  {faq.question}
                  <span className="shrink-0 text-xl font-bold text-daltar-accent-blue">
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[13.5px] text-daltar-text-muted">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
