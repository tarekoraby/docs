import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import './utils/board-card';
import './utils/board-chart';
import { boardBorderCSS, boardExampleBreakpointsCSS } from './utils/shared-styles';

@customElement('board-basic')
export class Example extends LitElement {
  static get styles() {
    return [
      boardBorderCSS,
      boardExampleBreakpointsCSS,
      css`
        vaadin-board-row:not(:last-child) {
          border-block-end: var(--board-border);
        }

        board-card {
          padding: var(--lumo-space-m);
        }

        board-card:not(:last-child) {
          border-inline-end: var(--board-border);
        }
      `,
    ];
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-board>
        <vaadin-board-row>
          <board-card type="+">
            Current users
            <span slot="current">745</span>
            <span slot="difference">33.7%</span>
          </board-card>
          <board-card type="-">
            View events
            <span slot="current">54.6k</span>
            <span slot="difference">112.45%</span>
          </board-card>
          <board-card type="+">
            Conversion rate
            <span slot="current">18%</span>
            <span slot="difference">3.9%</span>
          </board-card>
          <board-card type="±">
            Custom metric
            <span slot="current">-123.45</span>
            <span slot="difference">0.0%</span>
          </board-card>
        </vaadin-board-row>
        <vaadin-board-row>
          <board-chart></board-chart>
        </vaadin-board-row>
      </vaadin-board>
      <!-- end::snippet[] -->
    `;
  }
}
