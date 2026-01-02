import io
import pandas as pd
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.units import inch
from datetime import datetime
from typing import List, Dict, Any
import hashlib

class ReportingService:
    """
    Service for generating PDF and CSV reports for trading accounts.
    """

    @staticmethod
    def generate_pdf_report(
        user_email: str,
        account_id: str,
        account_info: Dict[str, Any],
        trades: List[Any],
        risk_status: Dict[str, Any],
        intelligence: Dict[str, Any]
    ) -> io.BytesIO:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=50, leftMargin=50, topMargin=50, bottomMargin=50)
        elements = []
        styles = getSampleStyleSheet()

        # Custom Styles
        title_style = ParagraphStyle(
            'TitleStyle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.hexColor("#0F172A"),
            spaceAfter=20
        )
        subtitle_style = ParagraphStyle(
            'SubtitleStyle',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=colors.hexColor("#64748B"),
            spaceAfter=10
        )
        footer_style = ParagraphStyle(
            'FooterStyle',
            parent=styles['Normal'],
            fontSize=8,
            textColor=colors.grey,
            alignment=1
        )

        # 1. Header
        elements.append(Paragraph("RiskLock Official Compliance Report", title_style))
        elements.append(Paragraph(f"Account ID: {account_id} | Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", subtitle_style))
        elements.append(Spacer(1, 0.2*inch))

        # 2. Performance Summary
        summary_data = [
            ["Metric", "Value"],
            ["Balance", f"{account_info.get('balance', 0):.2f} {account_info.get('currency', 'USD')}"],
            ["Equity", f"{account_info.get('equity', 0):.2f}"],
            ["Floating P/L", f"{account_info.get('profit', 0):.2f}"],
            ["Daily Max Loss", f"${risk_status.get('metrics', {}).get('daily_limit', 0):,.2f}"],
            ["Max Drawdown", f"${risk_status.get('metrics', {}).get('overall_limit', 0):,.2f}"],
            ["Safety Score", f"{intelligence.get('score', 100)}/100"]
        ]
        
        t = Table(summary_data, colWidths=[2.5*inch, 3*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.hexColor("#F1F5F9")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.hexColor("#475569")),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.white),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey)
        ]))
        elements.append(t)
        elements.append(Spacer(1, 0.3*inch))

        # 3. Breach Log
        elements.append(Paragraph("Breach Event Log", styles['Heading3']))
        violations = risk_status.get('violations', [])
        if violations:
            breach_data = [["Violation", "Status"]]
            for v in violations:
                breach_data.append([v, "ACTIVE"])
            
            bt = Table(breach_data, colWidths=[4*inch, 1.5*inch])
            bt.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.hexColor("#FEE2E2")),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.hexColor("#991B1B")),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.grey)
            ]))
            elements.append(bt)
        else:
            elements.append(Paragraph("No risk violations detected for this period.", styles['Normal']))
        elements.append(Spacer(1, 0.3*inch))

        # 4. Behavioral Flags
        elements.append(Paragraph("Behavioral Intelligence Flags", styles['Heading3']))
        flags = intelligence.get('flags', [])
        if flags:
            flag_data = [["Type", "Severity", "Message"]]
            for f in flags:
                flag_data.append([f['type'].upper(), f['severity'].upper(), f['message']])
            
            ft = Table(flag_data, colWidths=[1.2*inch, 1*inch, 3.3*inch])
            ft.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.hexColor("#FEF3C7")),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.grey)
            ]))
            elements.append(ft)
        else:
            elements.append(Paragraph("Perfect discipline maintained. No behavioral flags.", styles['Normal']))

        # 5. Footer (Disclaimer & Hash)
        elements.append(Spacer(1, 1*inch))
        report_hash = hashlib.sha256(f"{account_id}-{datetime.now()}".encode()).hexdigest()[:16]
        
        tier_label = "FREE TIER - PRO FEATURES DISABLED" if intelligence.get("score") == "Upgrade to Pro" else "PRO COMPLIANCE REPORT"
        elements.append(Paragraph(f"<b>{tier_label}</b>", footer_style))
        elements.append(Paragraph(f"This report is generated by RiskLock's non-execution engine. Verifier Hash: {report_hash.upper()}", footer_style))
        elements.append(Paragraph("Legal Disclaimer: RiskLock holds no execution permissions. All data is verified read-only.", footer_style))

        doc.build(elements)
        buffer.seek(0)
        return buffer

    @staticmethod
    def generate_csv_report(trades: List[Any]) -> io.StringIO:
        # Convert trade objects/dicts to a standard flat format for CSV
        flat_trades = []
        for t in trades:
            # Handle both object and dict
            def get_val(key):
                if isinstance(t, dict): return t.get(key)
                return getattr(t, key, None)
            
            flat_trades.append({
                "ticket": get_val('ticket'),
                "open_time": get_val('open_time'),
                "close_time": get_val('close_time'),
                "symbol": get_val('symbol'),
                "volume": get_val('volume'),
                "type": get_val('type'),
                "profit": get_val('profit'),
                "session": get_val('session')
            })
        
        df = pd.DataFrame(flat_trades)
        output = io.StringIO()
        df.to_csv(output, index=False)
        output.seek(0)
        return output

reporting_service = ReportingService()
