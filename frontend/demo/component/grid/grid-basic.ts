import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render, html } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-column
          header="Image"
          .renderer=${this.avatarRenderer}
          flex-grow="0"
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private avatarRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    render(
      html`
        <img
          style="height: var(--lumo-size-m)"
          src=${(model.item as Person).pictureUrl}
          alt="User avatar"
        />
      `,
      root
    );
  };
}
// end::snippet[]
