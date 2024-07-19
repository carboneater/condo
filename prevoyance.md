# Tracker Fonds de Prevoyance (Backend Service)

```SQL
SELECT * FROM assets where unit=0; # Grab all Shared Assets

SELECT * FROM maintenance   AS m
    LEFT JOIN assets AS a   ON m.assetId = a.id
                            AND COALESCE(a.unit,0)=0

```
