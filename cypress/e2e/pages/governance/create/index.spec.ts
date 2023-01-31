const viewPorts = ["macbook-16", "ipad-2", "iphone-x"];

viewPorts.forEach((viewPort) => {
  context(`/governance/create on ${viewPort}`, () => {
    const nameOfProposal = "Test Proposal";
    const discussion = "https://github.com/DeFiCh/dfips/issues/243";
    const receivingAddress = "mswsMVsyGMj1FzDMbbxw2QW3KvQAv2FKiy";
    const amountRequested = "100";

    before(() => {
      cy.visit("/on-chain-governance/create?network=Playground");
    });

    beforeEach(() => {
      cy.viewport(<Cypress.ViewportPreset>viewPort);
    });

    it("should have breadcrumb", () => {
      cy.findByTestId("Breadcrumb").should("be.visible");
    });

    it("should have heading", () => {
      cy.get("h1").should("have.text", "Create Proposal");
    });

    it("should have create proposal getting started info", () => {
      cy.findByTestId("Governance.Create.GettingStarted").should("be.visible");
      cy.findByTestId("Governance.Create.GettingStarted.Title").should(
        "have.text",
        "Getting started"
      );
      cy.findByTestId("Governance.Create.GettingStarted.Content").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.GettingStarted.Content.GitHub").should(
        "have.attr",
        "href",
        "https://github.com/DeFiCh/dfips/issues"
      );
      cy.findByTestId("Governance.Create.GettingStarted.Content.Reddit").should(
        "have.attr",
        "href",
        "https://www.reddit.com/r/defiblockchain/"
      );
      cy.findByTestId(
        "Governance.Create.GettingStarted.Content.ReadHere"
      ).should(
        "have.attr",
        "href",
        "https://github.com/DeFiCh/dfips/blob/master/README.md"
      );
    });

    it("should have step 1", () => {
      cy.findByTestId("Governance.Create.Step1").should("be.visible");

      cy.findByTestId("Governance.Create.Step1").within(() => {
        cy.findByTestId("Governance.Create.Step1.Title").should(
          "have.text",
          "Step 1: Proposal details"
        );

        cy.findByTestId("Governance.Create.Step1.Description").should(
          "have.text",
          "Enter from GitHub or Reddit the title of the proposal and the type of proposal."
        );
      });
    });

    it("should have step 1 cfp and dfip radio group", () => {
      cy.findByTestId("Governance.Create.Step1.RadioGroup").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.RadioGroup").within(() => {
        // CFP radio
        cy.findByTestId("Governance.Create.Step1.RadioGroup.CFP")
          .should("be.visible")
          .within(() => {
            cy.findByTestId(
              "Governance.Create.Step1.RadioGroup.CFP.Checked"
            ).should("be.visible");
          });
        // DFIP radio
        cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP")
          .should("be.visible")
          .within(() => {
            cy.findByTestId(
              "Governance.Create.Step1.RadioGroup.DFIP.Unchecked"
            ).should("be.visible");
          });

        cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP").click();

        // DFIP radio
        cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP")
          .should("be.visible")
          .within(() => {
            cy.findByTestId(
              "Governance.Create.Step1.RadioGroup.DFIP.Checked"
            ).should("be.visible");
          });
        // CFP radio
        cy.findByTestId("Governance.Create.Step1.RadioGroup.CFP")
          .should("be.visible")
          .within(() => {
            cy.findByTestId(
              "Governance.Create.Step1.RadioGroup.CFP.Unchecked"
            ).should("be.visible");
          });
      });
    });

    it("should have step 1 textarea inputs for cfp and dfip", () => {
      // DFIP
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").should(
        "be.visible"
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("not.exist");
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("not.exist");
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").should(
        "not.exist"
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).should("not.exist");
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().type(nameOfProposal);
          cy.get("button").click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid proposal name"
          );
        }
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(discussion);
          cy.get("button").click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid URL. Only GitHub or Reddit URL are accepted"
          );
        }
      );

      cy.findByTestId("Governance.Create.Step1.RadioGroup.CFP").click();

      // CFP
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").should(
        "be.visible"
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").should(
        "be.visible"
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("be.visible");
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("be.visible");
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").should(
        "be.visible"
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).should("be.visible");

      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().type(nameOfProposal);
          cy.get("button").click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid proposal name"
          );
        }
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(discussion);
          cy.get("button").click();
          cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
            "have.text",
            "Invalid URL. Only GitHub or Reddit URL are accepted"
          );
        }
      );

      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).within(() => {
        cy.get("textarea").click().type(amountRequested);
        cy.get("button").click();
        cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
          "have.text",
          "Invalid amount"
        );
      });

      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").within(() => {
        cy.get("textarea").should("have.text", "1");
      });
      cy.findByTestId("InfoHoverPopover").should("be.visible");

      cy.findByTestId(
        "Governance.Create.Step1.TextArea.Cycles.Increment"
      ).click();
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").within(() => {
        cy.get("textarea").should("have.text", "2");
      });
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.Cycles.Decrement"
      ).click();
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").within(() => {
        cy.get("textarea").should("have.text", "1");
      });

      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).within(() => {
        cy.get("textarea").click().type(receivingAddress);
        cy.get("button").click();
        cy.findByTestId("Governance.Create.Step1.TextArea.ErrorMsg").should(
          "have.text",
          "Invalid payout address. Only DFI addresses are accepted"
        );
      });
    });

    it("should have step 2", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().type(nameOfProposal);
        }
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(discussion);
        }
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).within(() => {
        cy.get("textarea").click().type(amountRequested);
      });
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).within(() => {
        cy.get("textarea").click().type(receivingAddress);
      });
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").click();

      cy.findByTestId("Governance.Create.Step2").should("be.visible");

      cy.findByTestId("Governance.Create.Step2").within(() => {
        cy.findByTestId("Governance.Create.Step2.Title").should(
          "have.text",
          "Step 2: Review proposal"
        );

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.Description"
        ).should(
          "have.text",
          "Make sure all details are correct as on-chain proposals are irreversible. You can edit details by going back to the previous steps."
        );

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalNameTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalName"
        ).should("have.text", nameOfProposal);

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalTypeTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalType"
        ).should("have.text", "CFP");

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalDiscussionTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputProposalDiscussion"
        ).should("have.text", discussion);

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputAmountRequestedTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputAmountRequested"
        ).should("have.text", `${amountRequested} DFI`);

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputCycleTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputCycle"
        ).should("have.text", 1);

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputReceivingAddressTitle"
        ).should("be.visible");
        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.InputReceivingAddress"
        ).should("have.text", receivingAddress);

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.CommandLineInfo"
        )
          .should("be.visible")
          .should(
            "have.text",
            "A command line will be generated once all details are confirmed"
          );

        cy.findByTestId(
          "Governance.Create.Step2.ReviewProposal.ConfirmDetails"
        ).click();
      });
    });

    it("should have step 3", () => {
      cy.findByTestId("Governance.Create.Step3").within(() => {
        cy.findByTestId("Governance.Create.Step3.Title").should(
          "have.text",
          "Step 3: Submit proposal on-chain"
        );

        cy.findByTestId("Governance.Create.Step3.SubmitProposal.Description")
          .should("be.visible")
          .within(() => {
            cy.get("a").should(
              "have.attr",
              "href",
              "https://defichain.com/downloads"
            );
          });

        cy.findByTestId("Governance.Create.Step3.SubmitProposal.Command")
          .should("be.visible")
          .should(
            "have.text",
            `creategovcfp '{"title": "${nameOfProposal}" ,"context":"${discussion}","amount": ${amountRequested} ,"payoutAddress":"${receivingAddress}", "cycles": 1}'`
          );

        cy.findByTestId("Governance.Create.Step3.SubmitProposal.Copy")
          .should("be.visible")
          .click();
        cy.window().then((window) => {
          window.navigator.clipboard.readText().then((text) => {
            expect(text).to.eq(
              `creategovcfp '{"title": "${nameOfProposal}" ,"context":"${discussion}","amount": ${amountRequested} ,"payoutAddress":"${receivingAddress}", "cycles": 1}'`
            );
          });
        });

        cy.findByTestId(
          "Governance.Create.Step3.SubmitProposal.InfoNote"
        ).should(
          "have.text",
          "Command submitted into defi-cli will not be editable. Please check your details carefully before submitting."
        );
      });
    });

    it("should be able to edit proposal", () => {
      cy.findByTestId("Governance.Create.Step1.Edit")
        .should("be.visible")
        .click();

      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().clear().type("Edited Proposal");
        }
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").click();
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalName"
      ).should("have.text", "Edited Proposal");

      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.ConfirmDetails"
      ).click();

      cy.findByTestId("Governance.Create.Step3.SubmitProposal.Command")
        .should("be.visible")
        .should(
          "have.text",
          `creategovcfp '{"title": "Edited Proposal" ,"context":"${discussion}","amount": ${amountRequested} ,"payoutAddress":"${receivingAddress}", "cycles": 1}'`
        );
    });

    it("should be able to cancel switching proposal when editing", () => {
      cy.findByTestId("Governance.Create.Step1.Edit")
        .should("be.visible")
        .click();

      cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP").click();
      cy.findByTestId("Governance.Create.ConfirmDialog.CancelButton")
        .should("be.visible")
        .click();

      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("be.visible");
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.AmountRequested"
      ).should("be.visible");
      cy.findByTestId("Governance.Create.Step1.TextArea.Cycles").should(
        "be.visible"
      );
      cy.findByTestId(
        "Governance.Create.Step1.TextArea.ReceivingAddress"
      ).should("be.visible");
    });

    it("should be able to switch proposal type", () => {
      cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP").click();

      cy.findByTestId("Governance.Create.ConfirmDialog.Title").should(
        "have.text",
        "Confirm Edit"
      );

      cy.findByTestId("Governance.Create.ConfirmDialog.Description").should(
        "have.text",
        "Changing the type of proposal would cause all data to reset. Are you sure you want to continue?"
      );

      cy.findByTestId("Governance.Create.ConfirmDialog.ConfirmButton")
        .should("be.visible")
        .click();

      cy.findByTestId("Governance.Create.Step1.RadioGroup.DFIP")
        .should("be.visible")
        .within(() => {
          cy.findByTestId(
            "Governance.Create.Step1.RadioGroup.DFIP.Checked"
          ).should("be.visible");
        });

      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").should("have.text", "");
        }
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").should("have.text", "");
        }
      );
    });

    it("should be able to create DFIP proposal", () => {
      cy.findByTestId("Governance.Create.Step1.TextArea.NameOfProposal").within(
        () => {
          cy.get("textarea").click().type(nameOfProposal);
        }
      );
      cy.findByTestId("Governance.Create.Step1.TextArea.Discussion").within(
        () => {
          cy.get("textarea").click().type(discussion);
        }
      );
      cy.findByTestId("Governance.Create.Step1.ReviewProposal").click();
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalNameTitle"
      ).should("be.visible");
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalName"
      ).should("have.text", nameOfProposal);

      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalTypeTitle"
      ).should("be.visible");
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalType"
      ).should("have.text", "DFIP");

      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalDiscussionTitle"
      ).should("be.visible");
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.InputProposalDiscussion"
      ).should("have.text", discussion);
      cy.findByTestId(
        "Governance.Create.Step2.ReviewProposal.ConfirmDetails"
      ).click();
      cy.findByTestId("Governance.Create.Step3.SubmitProposal.Command")
        .should("be.visible")
        .should(
          "have.text",
          `creategovvoc '{"title": "${nameOfProposal}" ,"context":"${discussion}"}'`
        );
    });
  });
});
