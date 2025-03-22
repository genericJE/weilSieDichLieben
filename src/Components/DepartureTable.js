import { Row, Col } from "antd";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import DOMPurify from "dompurify";

const DepartureTable = (props) => {
  const [isPaused, setIsPaused] = useState(false);
  const FONTSIZE = props.fontSize;
  const FONTFAMILYNAME = "DotMatrix";

  const styles = {
    columnName: {
      fontSize: FONTSIZE,
      fontFamily: FONTFAMILYNAME,
    },
    column: {
      color: "orange",
      fontSize: FONTSIZE,
      fontFamily: FONTFAMILYNAME,
    },
    headerRow: {
      backgroundColor: "lightGray",
      padding: "8px",
      position: "sticky",
      top: "-8px",
      zIndex: 5,
    },
    dataRow: {
      backgroundColor: "black",
      padding: "8px",
    },
    marquee: {
      color: "orange",
      fontSize: FONTSIZE * 0.8,
      fontFamily: FONTFAMILYNAME,
      backgroundColor: "black",
    },
  };

  const sanitizeHTML = (html) => {
    DOMPurify.addHook("afterSanitizeAttributes", function (node) {
      if (node.tagName === "A") {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
        node.setAttribute("class", "remark-link");
      }
    });

    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["a", "b", "i", "em", "strong"],
      ALLOWED_ATTR: ["href", "target", "rel", "class"],
    });
  };

  const processRemarks = (remarks) => {
    if (!remarks?.length) return "";
    return remarks.map((remark) => remark.text).join(" *** ");
  };

  const sortedDataSource = props.dataSource.sort((a, b) => a.when - b.when);

  return (
    <div style={{ padding: "16px", borderRadius: "8px" }}>
      <style>
        {`
          .remark-link, .remark-link:visited, .remark-link:hover, .remark-link:active {
            color: #FFA500 !important;
            text-decoration: underline !important;
            cursor: pointer;
          }
        `}
      </style>

      <Row style={styles.headerRow}>
        <Col style={styles.columnName} span={4}>
          Linie
        </Col>
        <Col style={styles.columnName} span={9}>
          Ziel
        </Col>
        <Col style={styles.columnName} span={9}>
          Abfahrt von
        </Col>
        <Col style={styles.columnName} span={2}>
          Abfahrt in
        </Col>
      </Row>

      {sortedDataSource.map((data) => {
        const remarkText = processRemarks(data.remarks);

        return (
          <div
            key={data.key}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Row style={styles.dataRow}>
              <Col style={styles.column} span={4}>
                {data.lineName}
              </Col>
              <Col style={styles.column} span={9}>
                {data.direction}
              </Col>
              <Col style={styles.column} span={9}>
                {data.departureName}
              </Col>
              <Col style={styles.column} span={2}>
                {data.when == null
                  ? "Fällt aus"
                  : data.when > 0
                  ? `${data.when} min`
                  : "Jetzt"}
              </Col>
            </Row>

            {remarkText && props.remarksVisibility && (
              <Marquee
                speed={30}
                play={!isPaused}
                style={styles.marquee}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(remarkText) }}
                  onClick={(e) =>
                    e.target.tagName === "A" && e.stopPropagation()
                  }
                />
              </Marquee>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DepartureTable;
