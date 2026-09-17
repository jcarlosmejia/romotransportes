/**
 * @description Simplified silhouette of the Mexican Republic.
 *
 * Hand-built rather than embedded from a map service: the section only needs a
 * recognisable national outline, and a Google Maps embed would cost several
 * hundred kilobytes plus a third-party request for a static marketing visual.
 *
 * The outline below is GENERATED, not drawn by eye. It was derived from the
 * public-domain Natural Earth 1:50m country boundaries (via `world-atlas`),
 * projected equirectangular with a cos(lat) correction at the country's mid
 * latitude, fitted to this 1000x620 viewBox, and reduced to 279 points with
 * Douglas–Peucker at a 1.5px tolerance. An earlier hand-plotted path was
 * replaced because it did not read as Mexico: the Yucatan peninsula was lost
 * and Baja California collapsed into a sliver. Baja arrives as part of the same
 * ring here because it is a peninsula joined to the mainland at the Colorado
 * delta; the sixteen offshore island rings in the source data are dropped.
 *
 * IMPORTANT: no route lines, city markers or corridor labels are drawn. The
 * only coverage statement the source material supports is "rutas nacionales";
 * plotting specific corridors would publish a route claim nobody has confirmed.
 *
 * @param className Classes for the root `<svg>`.
 */
export function MexicoMap({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 620"
      className={className}
      role="img"
      aria-labelledby="mapa-mexico-title mapa-mexico-desc"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="mapa-mexico-title">Mapa de la República Mexicana</title>
      <desc id="mapa-mexico-desc">
        Contorno estilizado de México que representa la cobertura de Romo&rsquo;s Transportes en
        rutas nacionales. No señala rutas ni ciudades específicas.
      </desc>

      <defs>
        {/* Diagonal hatch, matching the trailer-decking motif used site-wide. */}
        <pattern
          id="mapa-hatch"
          width="9"
          height="9"
          patternTransform="rotate(115)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        </pattern>
      </defs>

      <g>
        {/* Flat wash first so the landmass reads as a solid at small sizes, then
            the hatch for texture, then the outline. The wash matters: with the
            hatch alone the country dissolved into stripes in the ~440px-wide
            column this renders in. */}
        <path d={MEXICO_OUTLINE} fill="currentColor" opacity="0.07" />
        <path d={MEXICO_OUTLINE} fill="url(#mapa-hatch)" />
        <path
          d={MEXICO_OUTLINE}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.92"
        />
      </g>
    </svg>
  );
}

const MEXICO_OUTLINE =
  'M 34.7 12.1 L 108.4 6.0 L 105.0 12.9 L 221.3 52.5 L 308.0 52.4 L 308.1 37.3 L 362.3 37.7 L 371.3 ' +
  '48.3 L 409.1 77.3 L 416.3 92.4 L 418.1 101.7 L 425.0 111.1 L 459.9 130.3 L 465.1 128.9 L 471.2 ' +
  '123.1 L 476.1 108.8 L 479.7 105.2 L 490.3 101.1 L 515.7 104.3 L 536.6 124.2 L 549.7 147.0 L ' +
  '550.8 152.8 L 574.9 178.9 L 576.5 195.4 L 583.4 205.2 L 587.2 215.8 L 612.7 227.0 L 627.2 229.3 ' +
  'L 640.3 235.0 L 647.3 232.0 L 631.3 284.6 L 628.9 333.0 L 625.9 347.5 L 628.3 361.0 L 633.9 ' +
  '371.0 L 642.1 379.2 L 639.3 388.9 L 640.0 379.0 L 628.7 363.6 L 632.2 377.8 L 636.0 382.0 L ' +
  '646.1 407.5 L 668.4 435.8 L 673.6 453.4 L 689.3 471.5 L 684.9 471.0 L 693.9 475.3 L 691.0 472.7 ' +
  'L 707.5 474.9 L 719.3 481.2 L 727.0 492.5 L 729.7 492.8 L 737.9 491.8 L 757.5 484.0 L 777.9 ' +
  '482.7 L 783.3 477.9 L 791.6 475.8 L 805.8 474.4 L 808.7 477.0 L 807.7 480.7 L 819.4 483.1 L ' +
  '827.3 477.5 L 825.2 468.3 L 821.4 470.5 L 822.4 468.6 L 837.0 459.8 L 843.7 453.2 L 845.1 440.5 ' +
  'L 851.3 433.2 L 851.5 412.8 L 855.6 397.7 L 871.9 388.8 L 900.7 384.1 L 913.4 379.0 L 927.4 ' +
  '377.8 L 950.6 383.0 L 952.6 379.7 L 946.5 379.6 L 954.3 377.2 L 963.7 383.9 L 965.3 393.0 L ' +
  '960.6 405.2 L 945.4 423.7 L 944.1 437.4 L 937.2 443.6 L 938.6 446.4 L 945.3 445.4 L 943.5 450.1 ' +
  'L 938.1 453.2 L 938.2 456.3 L 943.0 455.3 L 932.2 489.4 L 926.4 482.2 L 927.3 474.1 L 925.4 ' +
  '470.5 L 918.6 482.6 L 911.6 483.5 L 902.9 499.6 L 900.2 501.3 L 895.5 498.4 L 892.9 499.4 L ' +
  '892.1 504.6 L 836.0 504.5 L 835.9 523.4 L 823.1 523.3 L 844.5 541.6 L 847.0 548.2 L 853.6 552.3 ' +
  'L 852.7 562.9 L 813.1 562.9 L 798.7 589.5 L 802.7 596.3 L 797.9 614.0 L 769.3 583.8 L 746.3 ' +
  '563.5 L 732.3 555.8 L 730.6 557.7 L 743.7 564.7 L 723.5 558.5 L 724.8 553.7 L 719.5 555.7 L ' +
  '716.2 551.3 L 712.4 556.0 L 719.3 558.3 L 709.0 559.4 L 698.9 566.1 L 675.9 575.6 L 666.8 576.9 ' +
  'L 646.1 568.3 L 628.7 566.4 L 616.9 558.4 L 605.2 555.1 L 597.8 547.4 L 569.3 541.2 L 559.0 ' +
  '534.5 L 533.9 525.1 L 510.7 510.0 L 501.0 499.7 L 477.0 496.3 L 454.3 487.5 L 439.9 470.6 L ' +
  '408.4 454.6 L 391.7 432.2 L 386.0 418.6 L 389.9 414.8 L 398.6 412.1 L 396.5 406.3 L 390.9 404.4 ' +
  'L 399.2 394.0 L 400.1 381.6 L 393.3 377.3 L 386.7 364.9 L 386.8 353.6 L 382.2 343.5 L 363.6 ' +
  '324.6 L 347.2 301.6 L 321.8 281.9 L 329.1 285.6 L 329.5 281.3 L 316.0 277.0 L 306.0 261.4 L ' +
  '310.3 263.6 L 313.1 261.9 L 293.2 251.4 L 290.4 246.2 L 283.0 248.1 L 281.8 245.7 L 287.5 239.6 ' +
  'L 281.4 243.6 L 274.5 243.0 L 272.1 239.9 L 270.9 229.6 L 277.8 220.5 L 280.4 222.3 L 275.4 ' +
  '212.8 L 269.1 206.9 L 260.7 207.2 L 255.0 194.6 L 241.7 189.4 L 235.1 179.0 L 237.0 168.4 L ' +
  '218.9 164.9 L 187.0 129.7 L 185.1 121.3 L 180.4 118.7 L 179.3 112.4 L 169.4 97.4 L 166.7 86.8 L ' +
  '159.5 75.1 L 157.7 61.8 L 159.9 57.4 L 142.2 51.8 L 141.9 47.8 L 138.0 44.7 L 132.3 42.4 L 130.5 ' +
  '45.8 L 126.1 46.4 L 102.0 33.2 L 106.5 41.7 L 103.6 58.2 L 109.1 71.3 L 110.8 88.9 L 113.7 96.1 ' +
  'L 138.1 118.1 L 144.5 126.9 L 146.0 132.8 L 149.6 132.1 L 151.5 136.6 L 155.0 137.0 L 158.4 ' +
  '146.7 L 165.3 149.6 L 169.5 169.6 L 181.8 179.7 L 186.1 191.0 L 191.9 194.6 L 196.2 208.0 L ' +
  '201.1 211.3 L 197.6 205.4 L 198.3 201.3 L 205.1 207.0 L 212.4 226.5 L 213.6 237.8 L 218.0 245.0 ' +
  'L 221.6 246.5 L 225.9 259.3 L 232.2 268.6 L 230.7 277.9 L 233.0 286.2 L 242.0 294.3 L 245.2 ' +
  '286.1 L 259.1 299.7 L 263.2 308.9 L 271.0 315.0 L 268.7 325.7 L 255.7 334.9 L 250.6 330.9 L ' +
  '247.7 319.7 L 242.2 310.8 L 233.9 306.4 L 201.7 279.0 L 198.1 279.5 L 196.6 275.2 L 189.8 269.5 ' +
  'L 188.0 262.7 L 189.8 245.0 L 186.6 233.6 L 180.4 223.5 L 171.8 220.1 L 160.6 211.2 L 156.6 ' +
  '199.0 L 152.9 204.3 L 143.0 206.6 L 135.5 198.4 L 116.9 190.0 L 114.1 182.8 L 100.2 172.6 L 98.8 ' +
  '169.1 L 113.2 171.0 L 121.5 168.1 L 121.4 171.3 L 128.5 174.6 L 125.8 166.5 L 122.5 166.0 L ' +
  '129.2 149.5 L 126.2 143.6 L 101.9 118.6 L 79.3 105.0 L 75.2 98.2 L 75.0 86.7 L 69.5 83.0 L 67.4 ' +
  '70.0 L 60.2 64.4 L 59.1 56.6 L 49.1 44.5 L 47.2 38.8 L 50.2 38.1 L 50.3 34.9 L 43.3 30.0 L 34.7 ' +
  '12.1 Z ' +
  '';
